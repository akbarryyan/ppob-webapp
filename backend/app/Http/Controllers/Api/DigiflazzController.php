<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

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
     * Get prepaid price list
     */
    public function getPrepaidPriceList(Request $request)
    {
        // Temporary mock data for testing
        $mockData = [
            [
                'brand' => 'TELKOMSEL',
                'product_name' => 'Telkomsel 5K',
                'price' => 6500,
                'buyer_product_status' => true,
                'seller_product_status' => true,
                'buyer_sku_code' => 'T5',
                'desc' => 'Telkomsel Pulsa 5.000',
                'category' => 'Pulsa',
                'type' => 'Prepaid',
                'unlimited_stock' => true,
                'stock' => 999999,
                'multi' => '1',
                'start_cut_off' => '00:00:00',
                'end_cut_off' => '23:59:59'
            ],
            [
                'brand' => 'INDOSAT',
                'product_name' => 'Indosat 10K',
                'price' => 10850,
                'buyer_product_status' => true,
                'seller_product_status' => true,
                'buyer_sku_code' => 'I10',
                'desc' => 'Indosat Pulsa 10.000',
                'category' => 'Pulsa',
                'type' => 'Prepaid',
                'unlimited_stock' => true,
                'stock' => 999999,
                'multi' => '1',
                'start_cut_off' => '00:00:00',
                'end_cut_off' => '23:59:59'
            ],
            [
                'brand' => 'XL',
                'product_name' => 'XL 15K',
                'price' => 16000,
                'buyer_product_status' => true,
                'seller_product_status' => false,
                'buyer_sku_code' => 'X15',
                'desc' => 'XL Pulsa 15.000',
                'category' => 'Pulsa',
                'type' => 'Prepaid',
                'unlimited_stock' => true,
                'stock' => 999999,
                'multi' => '1',
                'start_cut_off' => '00:00:00',
                'end_cut_off' => '23:59:59'
            ],
        ];

        return response()->json([
            'success' => true,
            'data' => $mockData,
            'message' => 'Mock price list retrieved successfully'
        ]);
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
