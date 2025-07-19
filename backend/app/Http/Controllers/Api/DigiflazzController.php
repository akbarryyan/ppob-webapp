<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\PriceList;
use Carbon\Carbon;

class DigiflazzController extends Controller
{
    private $apiBaseUrl;
    private $username;
    private $apiKey;

    public function __construct()
    {
        $this->apiBaseUrl = env('DIGIFLAZZ_API_BASE_URL', 'https://api.digiflazz.com/v1');
        $this->username = env('DIGIFLAZZ_USERNAME');
        $this->apiKey = env('DIGIFLAZZ_API_KEY');
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
                
                $priceList = PriceList::updateOrCreate(
                    [
                        'buyer_sku_code' => $item['buyer_sku_code']
                    ],
                    [
                        'brand' => $item['brand'] ?? '',
                        'product_name' => $item['product_name'] ?? '',
                        'price' => $item['price'] ?? 0,
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
}
