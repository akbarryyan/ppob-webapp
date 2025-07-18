import { useState } from "react";
import {
  DocumentTextIcon,
  CodeBracketIcon,
  KeyIcon,
  CubeIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ArrowTopRightOnSquareIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const APIDocs = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [copiedCode, setCopiedCode] = useState("");
  const [expandedEndpoint, setExpandedEndpoint] = useState(null);

  const handleCopyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  const sections = [
    { id: "overview", label: "Overview", icon: DocumentTextIcon },
    { id: "authentication", label: "Authentication", icon: KeyIcon },
    { id: "endpoints", label: "Endpoints", icon: CubeIcon },
    { id: "examples", label: "Examples", icon: CodeBracketIcon },
  ];

  const endpoints = [
    {
      id: "balance",
      method: "GET",
      path: "/api/v1/balance",
      title: "Get Balance",
      description: "Retrieve user account balance and transaction limits",
      parameters: [],
      response: {
        success: {
          balance: 2850000,
          currency: "IDR",
          available_limit: 5000000,
          daily_limit: 10000000,
        },
      },
    },
    {
      id: "topup",
      method: "POST",
      path: "/api/v1/topup",
      title: "Create Top Up",
      description: "Add balance to user account",
      parameters: [
        {
          name: "amount",
          type: "integer",
          required: true,
          description: "Amount to top up (minimum 10000)",
        },
        {
          name: "payment_method",
          type: "string",
          required: true,
          description: "bank_transfer, ewallet, credit_card",
        },
      ],
      response: {
        success: {
          transaction_id: "TRX001",
          amount: 100000,
          status: "pending",
          payment_url: "https://payment.bayaraja.com/pay/xxx",
        },
      },
    },
    {
      id: "pulsa",
      method: "POST",
      path: "/api/v1/pulsa",
      title: "Buy Mobile Credit",
      description: "Purchase mobile credit for phone numbers",
      parameters: [
        {
          name: "phone_number",
          type: "string",
          required: true,
          description: "Target phone number (08xxxxxxxxxx)",
        },
        {
          name: "provider",
          type: "string",
          required: true,
          description: "telkomsel, indosat, xl, tri, smartfren",
        },
        {
          name: "amount",
          type: "integer",
          required: true,
          description: "Credit amount (5000, 10000, 25000, etc.)",
        },
      ],
      response: {
        success: {
          transaction_id: "TRX002",
          phone_number: "081234567890",
          provider: "telkomsel",
          amount: 25000,
          status: "success",
        },
      },
    },
    {
      id: "pln",
      method: "POST",
      path: "/api/v1/pln",
      title: "Buy PLN Token",
      description: "Purchase electricity token for PLN meters",
      parameters: [
        {
          name: "meter_number",
          type: "string",
          required: true,
          description: "PLN meter number",
        },
        {
          name: "amount",
          type: "integer",
          required: true,
          description: "Token amount (20000, 50000, 100000, etc.)",
        },
      ],
      response: {
        success: {
          transaction_id: "TRX003",
          meter_number: "12345678901",
          amount: 100000,
          token: "1234-5678-9012-3456-7890",
          status: "success",
        },
      },
    },
  ];

  const codeExamples = {
    curl: `curl -X GET "https://api.bayaraja.com/api/v1/balance" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
    javascript: `const response = await fetch('https://api.bayaraja.com/api/v1/balance', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`,
    python: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.bayaraja.com/api/v1/balance', headers=headers)
data = response.json()
print(data)`,
    php: `<?php
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.bayaraja.com/api/v1/balance',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer YOUR_API_KEY',
    'Content-Type: application/json'
  ),
));

$response = curl_exec($curl);
curl_close($curl);

echo $response;
?>`,
  };

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-2xl p-4 sm:p-6 lg:p-8 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-sm mx-auto sm:mx-0">
                  <DocumentTextIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                    Bayaraja API Documentation
                  </h1>
                  <p className="text-blue-100 mt-1 sm:mt-2 text-sm sm:text-base">
                    Build powerful PPOB applications with our RESTful API
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
                <div className="bg-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 backdrop-blur-sm text-center">
                  <div className="text-xl sm:text-2xl font-bold">99.9%</div>
                  <div className="text-blue-100 text-xs sm:text-sm">
                    API Uptime
                  </div>
                </div>
                <div className="bg-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 backdrop-blur-sm text-center">
                  <div className="text-xl sm:text-2xl font-bold">&lt;200ms</div>
                  <div className="text-blue-100 text-xs sm:text-sm">
                    Response Time
                  </div>
                </div>
                <div className="bg-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 backdrop-blur-sm text-center">
                  <div className="text-xl sm:text-2xl font-bold">50+</div>
                  <div className="text-blue-100 text-xs sm:text-sm">
                    PPOB Products
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Start */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <CubeIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-blue-600" />
                Quick Start
              </h2>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                    1. Get Your API Key
                  </h3>
                  <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <code className="text-xs sm:text-sm text-gray-600 truncate mr-2">
                        sk_live_abcd1234567890...
                      </code>
                      <button
                        onClick={() =>
                          handleCopyCode("sk_live_abcd1234567890...", "apikey")
                        }
                        className="flex-shrink-0 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        {copiedCode === "apikey" ? (
                          <CheckIcon className="w-4 h-4 text-green-600" />
                        ) : (
                          <ClipboardDocumentIcon className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                    2. Make Your First Request
                  </h3>
                  <div className="bg-gray-900 rounded-lg sm:rounded-xl p-3 sm:p-4 text-green-400 text-xs sm:text-sm font-mono">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">bash</span>
                      <button
                        onClick={() =>
                          handleCopyCode(
                            'curl -H "Authorization: Bearer YOUR_API_KEY" https://api.bayaraja.com/api/v1/balance',
                            "quickstart"
                          )
                        }
                        className="text-gray-400 hover:text-gray-200 flex-shrink-0"
                      >
                        {copiedCode === "quickstart" ? (
                          <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                        ) : (
                          <ClipboardDocumentIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                      </button>
                    </div>
                    <div className="break-all">
                      curl -H "Authorization: Bearer YOUR_API_KEY" \
                    </div>
                    <div className="ml-2 sm:ml-4 break-all">
                      https://api.bayaraja.com/api/v1/balance
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  icon: "🚀",
                  title: "Easy Integration",
                  description:
                    "Simple RESTful API with comprehensive documentation and code examples",
                },
                {
                  icon: "🔒",
                  title: "Secure & Reliable",
                  description:
                    "Bank-level security with API key authentication and encrypted connections",
                },
                {
                  icon: "📱",
                  title: "PPOB Products",
                  description:
                    "Complete range of digital products: pulsa, PLN, internet, gaming, and more",
                },
                {
                  icon: "⚡",
                  title: "Real-time Processing",
                  description:
                    "Instant transaction processing with webhook notifications",
                },
                {
                  icon: "📊",
                  title: "Analytics Dashboard",
                  description:
                    "Monitor your API usage, transactions, and performance metrics",
                },
                {
                  icon: "🌍",
                  title: "24/7 Support",
                  description:
                    "Technical support and comprehensive documentation for developers",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case "authentication":
        return (
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <KeyIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-blue-600" />
                API Authentication
              </h2>

              <div className="space-y-4 sm:space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <div className="flex items-start space-x-3">
                    <InformationCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">
                        API Key Authentication
                      </h3>
                      <p className="text-blue-800 text-xs sm:text-sm leading-relaxed">
                        Bayaraja API uses API key authentication. Include your
                        API key in the Authorization header of every request.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                    How to Authenticate
                  </h3>
                  <div className="bg-gray-900 rounded-lg sm:rounded-xl p-4 sm:p-6 text-white">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className="text-gray-400 text-xs sm:text-sm">
                        HTTP Header
                      </span>
                      <button
                        onClick={() =>
                          handleCopyCode(
                            "Authorization: Bearer YOUR_API_KEY",
                            "auth-header"
                          )
                        }
                        className="text-gray-400 hover:text-gray-200 flex-shrink-0"
                      >
                        {copiedCode === "auth-header" ? (
                          <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                        ) : (
                          <ClipboardDocumentIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                      </button>
                    </div>
                    <code className="text-green-400 text-xs sm:text-sm break-all">
                      Authorization: Bearer YOUR_API_KEY
                    </code>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
                  <div className="bg-green-50 border border-green-200 rounded-lg sm:rounded-xl p-4 sm:p-6">
                    <h4 className="font-semibold text-green-900 mb-2 flex items-center text-sm sm:text-base">
                      <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                      Production Environment
                    </h4>
                    <p className="text-green-800 text-xs sm:text-sm mb-3">
                      Use your live API key for production:
                    </p>
                    <code className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
                      sk_live_...
                    </code>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg sm:rounded-xl p-4 sm:p-6">
                    <h4 className="font-semibold text-yellow-900 mb-2 flex items-center text-sm sm:text-base">
                      <ExclamationTriangleIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                      Sandbox Environment
                    </h4>
                    <p className="text-yellow-800 text-xs sm:text-sm mb-3">
                      Use your test API key for development:
                    </p>
                    <code className="bg-yellow-100 text-yellow-800 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
                      sk_test_...
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                    Base URLs
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 sm:p-4">
                      <div className="min-w-0 flex-1 mr-3">
                        <div className="font-medium text-gray-900 text-sm sm:text-base">
                          Production
                        </div>
                        <code className="text-blue-600 text-xs sm:text-sm break-all">
                          https://api.bayaraja.com
                        </code>
                      </div>
                      <button
                        onClick={() =>
                          handleCopyCode("https://api.bayaraja.com", "prod-url")
                        }
                        className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                      >
                        {copiedCode === "prod-url" ? (
                          <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                        ) : (
                          <ClipboardDocumentIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 sm:p-4">
                      <div className="min-w-0 flex-1 mr-3">
                        <div className="font-medium text-gray-900 text-sm sm:text-base">
                          Sandbox
                        </div>
                        <code className="text-blue-600 text-xs sm:text-sm break-all">
                          https://sandbox-api.bayaraja.com
                        </code>
                      </div>
                      <button
                        onClick={() =>
                          handleCopyCode(
                            "https://sandbox-api.bayaraja.com",
                            "sandbox-url"
                          )
                        }
                        className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                      >
                        {copiedCode === "sandbox-url" ? (
                          <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                        ) : (
                          <ClipboardDocumentIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "endpoints":
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <CubeIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-blue-600" />
                API Endpoints
              </h2>

              <div className="space-y-3 sm:space-y-4">
                {endpoints.map((endpoint) => (
                  <div
                    key={endpoint.id}
                    className="border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setExpandedEndpoint(
                          expandedEndpoint === endpoint.id ? null : endpoint.id
                        )
                      }
                      className="w-full flex items-center justify-between p-4 sm:p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                        <span
                          className={`px-2 sm:px-3 py-1 rounded-lg text-xs font-semibold flex-shrink-0 ${
                            endpoint.method === "GET"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {endpoint.method}
                        </span>
                        <div className="text-left min-w-0 flex-1">
                          <div className="font-semibold text-gray-900 text-sm sm:text-base">
                            {endpoint.title}
                          </div>
                          <code className="text-blue-600 text-xs sm:text-sm break-all">
                            {endpoint.path}
                          </code>
                        </div>
                      </div>
                      {expandedEndpoint === endpoint.id ? (
                        <ChevronDownIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 ml-2" />
                      ) : (
                        <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 ml-2" />
                      )}
                    </button>

                    {expandedEndpoint === endpoint.id && (
                      <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50">
                        <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
                          {endpoint.description}
                        </p>

                        {endpoint.parameters.length > 0 && (
                          <div className="mb-4 sm:mb-6">
                            <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
                              Parameters
                            </h4>
                            <div className="space-y-3">
                              {endpoint.parameters.map((param, index) => (
                                <div
                                  key={index}
                                  className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200"
                                >
                                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                                    <code className="text-blue-600 font-medium text-xs sm:text-sm">
                                      {param.name}
                                    </code>
                                    <span
                                      className={`px-2 py-1 rounded text-xs ${
                                        param.required
                                          ? "bg-red-100 text-red-800"
                                          : "bg-gray-100 text-gray-800"
                                      }`}
                                    >
                                      {param.required ? "required" : "optional"}
                                    </span>
                                    <span className="text-gray-500 text-xs sm:text-sm">
                                      {param.type}
                                    </span>
                                  </div>
                                  <p className="text-gray-600 text-xs sm:text-sm">
                                    {param.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
                            Response Example
                          </h4>
                          <div className="bg-gray-900 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-gray-400 text-xs sm:text-sm">
                                JSON Response
                              </span>
                              <button
                                onClick={() =>
                                  handleCopyCode(
                                    JSON.stringify(
                                      endpoint.response.success,
                                      null,
                                      2
                                    ),
                                    `response-${endpoint.id}`
                                  )
                                }
                                className="text-gray-400 hover:text-gray-200 flex-shrink-0"
                              >
                                {copiedCode === `response-${endpoint.id}` ? (
                                  <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                                ) : (
                                  <ClipboardDocumentIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                                )}
                              </button>
                            </div>
                            <pre className="text-green-400 text-xs sm:text-sm overflow-x-auto">
                              {JSON.stringify(
                                endpoint.response.success,
                                null,
                                2
                              )}
                            </pre>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "examples":
        return (
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <CodeBracketIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-blue-600" />
                Code Examples
              </h2>

              <div className="space-y-4 sm:space-y-6">
                {Object.entries(codeExamples).map(([language, code]) => (
                  <div
                    key={language}
                    className="border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden"
                  >
                    <div className="flex items-center justify-between bg-gray-50 px-4 sm:px-6 py-3 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded-full"></div>
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
                        </div>
                        <span className="ml-2 sm:ml-4 font-medium text-gray-700 capitalize text-sm sm:text-base">
                          {language}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopyCode(code, language)}
                        className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {copiedCode === language ? (
                          <>
                            <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                            <span className="text-green-600 text-xs sm:text-sm">
                              Copied!
                            </span>
                          </>
                        ) : (
                          <>
                            <ClipboardDocumentIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="text-xs sm:text-sm">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-gray-900 p-3 sm:p-4 lg:p-6">
                      <pre className="text-green-400 text-xs sm:text-sm overflow-x-auto whitespace-pre-wrap">
                        {code}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Resources */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                Additional Resources
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                <a
                  href="#"
                  className="group flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 border border-gray-200 rounded-lg sm:rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-200"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors flex-shrink-0">
                    <DocumentTextIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-sm sm:text-base">
                      Postman Collection
                    </div>
                    <div className="text-gray-500 text-xs sm:text-sm">
                      Import ready-to-use API collection
                    </div>
                  </div>
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                </a>

                <a
                  href="#"
                  className="group flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 border border-gray-200 rounded-lg sm:rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-200"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors flex-shrink-0">
                    <CodeBracketIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors text-sm sm:text-base">
                      SDK Libraries
                    </div>
                    <div className="text-gray-500 text-xs sm:text-sm">
                      Official SDKs for popular languages
                    </div>
                  </div>
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-purple-600 transition-colors flex-shrink-0" />
                </a>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            API Documentation
          </h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            Complete guide to integrate with Bayaraja PPOB API
          </p>
        </div>

        <div className="flex-shrink-0">
          <a
            href="#"
            className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-600 text-white font-medium rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            <KeyIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Get API Key
          </a>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="flex overflow-x-auto scrollbar-hide">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap border-b-2 transition-all duration-200 text-sm sm:text-base ${
                activeSection === section.id
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <section.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="font-medium">{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default APIDocs;
