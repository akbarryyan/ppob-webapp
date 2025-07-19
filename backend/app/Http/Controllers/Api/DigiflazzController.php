<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\PriceList;
use App\Models\DigiflazzSetting;
use Carbon\Carbon;

class DigiflazzController extends Controller
{
    private $apiBaseUrl;
    private $username;
    private $apiKey;

    public function __construct()
    {
        $this->apiBaseUrl = env('DIGIFLAZZ_API_BASE_URL', 'https://api.digiflazz.com/v1');
        
        // Try to get credentials from database first, fallback to env
        $setting = DigiflazzSetting::getActiveSetting();
        if ($setting) {
            $this->username = $setting->username;
            $this->apiKey = $setting->api_key;
        } else {
            // Fallback to environment variables
            $this->username = env('DIGIFLAZZ_USERNAME');
            $this->apiKey = env('DIGIFLAZZ_API_KEY');
        }
    }

    /**
     * Generate MD5 signature for Digiflazz API
     */
    private function generateSignature($cmd)
    {
        return md5($this->username . $this->apiKey . $cmd);
    }

    /**
     * Get prepaid price list from database
     */
    public function getPrepaidPriceList(Request $request)
    {
        try {
            // Get data from database
            $query = PriceList::prepaid();
            
            // Apply filters if provided
            if ($request->has('category')) {
                $query->where('category', $request->category);
            }
            if ($request->has('brand')) {
                $query->where('brand', $request->brand);
            }
            if ($request->has('type')) {
                $query->where('type', $request->type);
            }

            $priceList = $query->orderBy('brand')->orderBy('product_name')->get();

            // Transform to array format for frontend
            $data = $priceList->toArray();

            return response()->json([
                'success' => true,
                'data' => $data,
                'message' => 'Price list retrieved successfully from database',
                'count' => count($data)
            ]);

        } catch (\Exception $e) {
            Log::error('Database PriceList Exception', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Internal server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Sync prepaid price list from Digiflazz API to database
     */
    public function syncPrepaidPriceList(Request $request)
    {
        try {
            // Validate profit settings
            $request->validate([
                'profit_type' => 'required|in:percentage,fixed',
                'profit_margin' => 'nullable|numeric|min:0|max:100',
                'fixed_profit' => 'nullable|integer|min:0',
            ]);

            $profitType = $request->profit_type;
            $profitMargin = $request->profit_margin;
            $fixedProfit = $request->fixed_profit;

            $requestBody = [
                'cmd' => 'prepaid',
                'username' => $this->username,
                'sign' => $this->generateSignature('pricelist'),
            ];

            // Add optional filters if provided
            $filters = $request->only(['category', 'brand', 'type', 'code']);
            $requestBody = array_merge($requestBody, $filters);

            $response = Http::timeout(60)->post($this->apiBaseUrl . '/price-list', $requestBody);

            if (!$response->successful()) {
                Log::error('Digiflazz API Error', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);

                return response()->json([
                    'success' => false,
                    'message' => 'Failed to fetch price list from Digiflazz',
                    'error' => 'API request failed'
                ], $response->status());
            }

            $data = $response->json();
            $apiData = $data['data'] ?? [];

            if (empty($apiData)) {
                return response()->json([
                    'success' => false,
                    'message' => 'No data received from Digiflazz API',
                    'data' => []
                ]);
            }

            // Sync data to database
            $syncedCount = 0;
            $updatedCount = 0;

            foreach ($apiData as $item) {
                // Handle empty datetime strings
                $startCutOff = (!empty($item['start_cut_off']) && $item['start_cut_off'] !== '') ? $item['start_cut_off'] : null;
                $endCutOff = (!empty($item['end_cut_off']) && $item['end_cut_off'] !== '') ? $item['end_cut_off'] : null;
                
                // Calculate selling price with profit margin
                $originalPrice = $item['price'] ?? 0;
                $sellingPrice = $originalPrice;
                
                if ($profitType === 'percentage' && $profitMargin > 0) {
                    $sellingPrice = round($originalPrice * (1 + $profitMargin / 100));
                } elseif ($profitType === 'fixed' && $fixedProfit > 0) {
                    $sellingPrice = $originalPrice + $fixedProfit;
                }
                
                $priceList = PriceList::updateOrCreate(
                    [
                        'buyer_sku_code' => $item['buyer_sku_code']
                    ],
                    [
                        'brand' => $item['brand'] ?? '',
                        'product_name' => $item['product_name'] ?? '',
                        'original_price' => $originalPrice, // Store original price from Digiflazz
                        'price' => $sellingPrice, // Store selling price with profit
                        'buyer_product_status' => $item['buyer_product_status'] ?? false,
                        'seller_product_status' => $item['seller_product_status'] ?? false,
                        'desc' => $item['desc'] ?? null,
                        'category' => $item['category'] ?? null,
                        'type' => $item['type'] ?? null,
                        'unlimited_stock' => $item['unlimited_stock'] ?? false,
                        'stock' => $item['stock'] ?? 0,
                        'multi' => $item['multi'] ?? null,
                        'start_cut_off' => $startCutOff,
                        'end_cut_off' => $endCutOff,
                        'product_type' => 'prepaid',
                        'profit_type' => $profitType,
                        'profit_margin' => $profitType === 'percentage' ? $profitMargin : null,
                        'fixed_profit' => $profitType === 'fixed' ? $fixedProfit : null,
                        'last_updated' => Carbon::now(),
                    ]
                );

                if ($priceList->wasRecentlyCreated) {
                    $syncedCount++;
                } else {
                    $updatedCount++;
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'Price list synced successfully',
                'synced_count' => $syncedCount,
                'updated_count' => $updatedCount,
                'total_processed' => count($apiData)
            ]);

        } catch (\Exception $e) {
            Log::error('Digiflazz Sync Exception', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Internal server error during sync',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get postpaid price list
     */
    public function getPostpaidPriceList(Request $request)
    {
        try {
            $requestBody = [
                'cmd' => 'pasca',
                'username' => $this->username,
                'sign' => $this->generateSignature('pricelist'),
            ];

            // Add optional filters if provided
            $filters = $request->only(['brand', 'code']);
            $requestBody = array_merge($requestBody, $filters);

            $response = Http::timeout(30)->post($this->apiBaseUrl . '/price-list', $requestBody);

            if (!$response->successful()) {
                Log::error('Digiflazz API Error', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);

                return response()->json([
                    'success' => false,
                    'message' => 'Failed to fetch postpaid price list',
                    'error' => 'API request failed'
                ], $response->status());
            }

            $data = $response->json();

            // Debug: Log the response structure
            Log::info('Digiflazz Postpaid API Response', [
                'raw_response' => $data,
                'data_property' => $data['data'] ?? 'not found',
                'data_type' => gettype($data['data'] ?? null),
                'is_array' => is_array($data['data'] ?? null),
            ]);

            return response()->json([
                'success' => true,
                'data' => $data['data'] ?? [],
                'message' => 'Postpaid price list retrieved successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Digiflazz API Exception', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Internal server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Test Digiflazz API connection (debug endpoint)
     */
    public function testApi()
    {
        return response()->json([
            'success' => true,
            'message' => 'Test endpoint working',
            'env_username' => $this->username ?? 'not set',
            'env_api_key_length' => $this->apiKey ? strlen($this->apiKey) : 'not set',
            'api_url' => $this->apiBaseUrl,
        ]);
    }

    /**
     * Get Digiflazz settings
     */
    public function getSettings()
    {
        try {
            $setting = DigiflazzSetting::getActiveSetting();
            
            if (!$setting) {
                return response()->json([
                    'success' => true,
                    'data' => null,
                    'message' => 'No Digiflazz settings found'
                ]);
            }

            // Don't expose API key in response
            $settingData = $setting->toArray();
            $settingData['api_key'] = $setting->api_key ? '***********' : null;

            return response()->json([
                'success' => true,
                'data' => $settingData,
            ]);

        } catch (\Exception $e) {
            Log::error('Get Digiflazz Settings Error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to get Digiflazz settings'
            ], 500);
        }
    }

    /**
     * Update Digiflazz settings
     */
    public function updateSettings(Request $request)
    {
        try {
            $request->validate([
                'username' => 'required|string|max:255',
                'api_key' => 'required|string',
                'whitelist_ips' => 'nullable|string',
            ]);

            // Deactivate all existing settings
            DigiflazzSetting::where('is_active', true)->update(['is_active' => false]);

            // Create or update setting
            $setting = DigiflazzSetting::create([
                'username' => $request->username,
                'api_key' => $request->api_key,
                'whitelist_ips' => $request->whitelist_ips,
                'is_active' => true,
            ]);

            // Update credentials for current instance
            $this->username = $request->username;
            $this->apiKey = $request->api_key;

            return response()->json([
                'success' => true,
                'message' => 'Digiflazz settings updated successfully',
                'data' => [
                    'username' => $setting->username,
                    'api_key' => '***********',
                    'whitelist_ips' => $setting->whitelist_ips,
                    'is_active' => $setting->is_active,
                ]
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Update Digiflazz Settings Error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to update Digiflazz settings'
            ], 500);
        }
    }

    /**
     * Check Digiflazz account balance
     */
    public function checkBalance()
    {
        try {
            // Get active setting from database
            $setting = DigiflazzSetting::getActiveSetting();
            
            if (!$setting) {
                return response()->json([
                    'success' => false,
                    'message' => 'No active Digiflazz settings found. Please configure your settings first.'
                ], 404);
            }

            // Use setting credentials
            $username = $setting->username;
            $apiKey = $setting->api_key;
            $signature = md5($username . $apiKey . "depo");

            $requestData = [
                'cmd' => 'deposit',
                'username' => $username,
                'sign' => $signature
            ];

            Log::info('Digiflazz Balance Check Request', [
                'request_data' => array_merge($requestData, ['sign' => '***hidden***'])
            ]);

            $response = Http::timeout(30)
                ->post($this->apiBaseUrl . '/cek-saldo', $requestData);

            if ($response->successful()) {
                $data = $response->json();
                
                Log::info('Digiflazz Balance Check Response', [
                    'response_data' => $data
                ]);

                if (isset($data['data']['deposit'])) {
                    $balance = $data['data']['deposit'];
                    
                    // Update balance in settings
                    $setting->update([
                        'current_balance' => $balance,
                        'balance_updated_at' => now()
                    ]);

                    return response()->json([
                        'success' => true,
                        'data' => [
                            'balance' => $balance,
                            'formatted_balance' => 'Rp ' . number_format($balance, 0, ',', '.'),
                            'last_updated' => $setting->balance_updated_at->format('Y-m-d H:i:s'),
                        ],
                        'message' => 'Balance retrieved successfully'
                    ]);
                } else {
                    Log::error('Digiflazz Balance Check - Invalid Response Format', [
                        'response' => $data
                    ]);
                    
                    return response()->json([
                        'success' => false,
                        'message' => 'Invalid response format from Digiflazz API'
                    ], 500);
                }
            } else {
                Log::error('Digiflazz Balance Check API Error', [
                    'status' => $response->status(),
                    'response' => $response->body()
                ]);

                return response()->json([
                    'success' => false,
                    'message' => 'Failed to connect to Digiflazz API',
                    'status_code' => $response->status()
                ], 500);
            }

        } catch (\Exception $e) {
            Log::error('Digiflazz Balance Check Exception', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while checking balance'
            ], 500);
        }
    }
}
