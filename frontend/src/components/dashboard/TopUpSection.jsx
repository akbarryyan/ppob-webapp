import {
  CreditCardIcon,
  BanknotesIcon,
  DevicePhoneMobileIcon,
  BuildingLibraryIcon,
  QrCodeIcon,
  CheckIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import {
  CreditCardIcon as CreditCardIconSolid,
  BanknotesIcon as BanknotesIconSolid,
} from "@heroicons/react/24/solid";
import { useState } from "react";

const TopUpSection = ({ userBalance }) => {
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const quickAmounts = [
    { value: 50000, label: "50K", popular: false },
    { value: 100000, label: "100K", popular: true },
    { value: 200000, label: "200K", popular: false },
    { value: 500000, label: "500K", popular: true },
    { value: 1000000, label: "1Jt", popular: false },
    { value: 2000000, label: "2Jt", popular: false },
  ];

  const paymentMethods = [
    {
      id: "bank_transfer",
      name: "Transfer Bank",
      description: "BCA, Mandiri, BRI, BNI",
      icon: BuildingLibraryIcon,
      fee: 0,
      time: "Instan",
      popular: true,
    },
    {
      id: "e_wallet",
      name: "E-Wallet",
      description: "GoPay, OVO, DANA, ShopeePay",
      icon: DevicePhoneMobileIcon,
      fee: 0,
      time: "Instan",
      popular: true,
    },
    {
      id: "virtual_account",
      name: "Virtual Account",
      description: "VA BCA, Mandiri, BRI",
      icon: CreditCardIcon,
      fee: 4000,
      time: "1-5 menit",
      popular: false,
    },
    {
      id: "qris",
      name: "QRIS",
      description: "Scan QR untuk bayar",
      icon: QrCodeIcon,
      fee: 0,
      time: "Instan",
      popular: false,
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getSelectedAmountValue = () => {
    return customAmount ? parseInt(customAmount) : selectedAmount;
  };

  const getTotalAmount = () => {
    const amount = getSelectedAmountValue();
    const method = paymentMethods.find((m) => m.id === selectedMethod);
    const fee = method ? method.fee : 0;
    return amount + fee;
  };

  const handleTopUp = () => {
    if (!getSelectedAmountValue() || !selectedMethod) return;

    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      // Reset form
      setSelectedAmount("");
      setCustomAmount("");
      setSelectedMethod("");
      alert("Top up berhasil diproses!");
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center shadow-xl">
            <BanknotesIconSolid className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent mb-2">
          Top Up Saldo
        </h2>
        <p className="text-gray-600 text-lg">
          Isi saldo untuk melakukan transaksi dengan mudah dan cepat
        </p>
      </div>

      {/* Current Balance Card */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-xl overflow-hidden">
        <div className="relative p-6">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>

          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <CreditCardIconSolid className="w-6 h-6 mr-2" />
                Saldo Saat Ini
              </h3>
              <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <span className="text-white text-sm font-semibold">Aktif</span>
              </div>
            </div>

            <div className="text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {formatCurrency(userBalance)}
              </div>
              <div className="text-blue-100 text-sm">
                Terakhir diperbarui: Hari ini, 14:30
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Amount Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Amount Selection */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
            <div className="p-6 border-b border-gray-200/50">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <BanknotesIcon className="w-6 h-6 mr-3 text-green-600" />
                Pilih Nominal
              </h3>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount.value}
                    onClick={() => {
                      setSelectedAmount(amount.value);
                      setCustomAmount("");
                    }}
                    className={`relative p-4 border-2 rounded-2xl transition-all duration-200 hover:scale-105 ${
                      selectedAmount === amount.value && !customAmount
                        ? "border-green-500 bg-green-50 shadow-lg"
                        : "border-gray-200 hover:border-green-300 hover:bg-green-50/50"
                    }`}
                  >
                    {amount.popular && (
                      <div className="absolute -top-2 -right-2 px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                        Popular
                      </div>
                    )}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {amount.label}
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatCurrency(amount.value)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Atau masukkan nominal custom
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-lg font-medium">
                      Rp
                    </span>
                  </div>
                  <input
                    type="number"
                    placeholder="0"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount("");
                    }}
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-semibold"
                    min="10000"
                    max="10000000"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Minimal Rp 10.000, Maksimal Rp 10.000.000
                </p>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
            <div className="p-6 border-b border-gray-200/50">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <CreditCardIcon className="w-6 h-6 mr-3 text-blue-600" />
                Metode Pembayaran
              </h3>
            </div>

            <div className="p-6 space-y-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full p-4 border-2 rounded-2xl transition-all duration-200 hover:scale-[1.02] ${
                    selectedMethod === method.id
                      ? "border-blue-500 bg-blue-50 shadow-lg"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        selectedMethod === method.id
                          ? "bg-blue-500"
                          : "bg-gray-100"
                      }`}
                    >
                      <method.icon
                        className={`w-6 h-6 ${
                          selectedMethod === method.id
                            ? "text-white"
                            : "text-gray-600"
                        }`}
                      />
                    </div>

                    <div className="flex-1 text-left">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-900">
                          {method.name}
                        </h4>
                        {method.popular && (
                          <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded-full">
                            Populer
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {method.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">
                          Biaya:{" "}
                          {method.fee === 0
                            ? "Gratis"
                            : formatCurrency(method.fee)}
                        </span>
                        <span className="text-xs text-green-600 flex items-center">
                          <ClockIcon className="w-3 h-3 mr-1" />
                          {method.time}
                        </span>
                      </div>
                    </div>

                    {selectedMethod === method.id && (
                      <CheckIcon className="w-6 h-6 text-blue-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary & Action */}
        <div className="space-y-6">
          {/* Transaction Summary */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
            <div className="p-6 border-b border-gray-200/50">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <SparklesIcon className="w-6 h-6 mr-3 text-purple-600" />
                Ringkasan
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Nominal Top Up</span>
                  <span className="font-semibold text-gray-900">
                    {getSelectedAmountValue()
                      ? formatCurrency(getSelectedAmountValue())
                      : "-"}
                  </span>
                </div>

                {selectedMethod && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Biaya Admin</span>
                      <span className="font-semibold text-gray-900">
                        {paymentMethods.find((m) => m.id === selectedMethod)
                          ?.fee === 0
                          ? "Gratis"
                          : formatCurrency(
                              paymentMethods.find(
                                (m) => m.id === selectedMethod
                              )?.fee || 0
                            )}
                      </span>
                    </div>
                    <hr className="border-gray-200" />
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">
                        Total Bayar
                      </span>
                      <span className="text-xl font-bold text-green-600">
                        {getSelectedAmountValue()
                          ? formatCurrency(getTotalAmount())
                          : "-"}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={handleTopUp}
                disabled={
                  !getSelectedAmountValue() || !selectedMethod || isProcessing
                }
                className={`w-full flex items-center justify-center space-x-3 p-4 rounded-2xl font-semibold transition-all duration-200 ${
                  !getSelectedAmountValue() || !selectedMethod
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : isProcessing
                    ? "bg-orange-500 text-white"
                    : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 hover:scale-[1.02] shadow-lg"
                }`}
              >
                {isProcessing ? (
                  <>
                    <ClockIcon className="w-5 h-5 animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <PlusIcon className="w-5 h-5" />
                    <span>Top Up Sekarang</span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Security Info */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-6 border border-blue-200/50">
            <div className="flex items-start space-x-3">
              <ShieldCheckIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">
                  Keamanan Terjamin
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Transaksi dilindungi SSL 256-bit</li>
                  <li>• Tidak menyimpan data kartu</li>
                  <li>• Sistem pembayaran tersertifikasi</li>
                  <li>• Notifikasi real-time</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-6 border border-orange-200/50">
            <div className="flex items-start space-x-3">
              <ExclamationTriangleIcon className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-orange-900 mb-2">
                  Tips Top Up
                </h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Pastikan nominal sudah benar</li>
                  <li>• Simpan bukti transaksi</li>
                  <li>• Saldo masuk maksimal 5 menit</li>
                  <li>• Hubungi CS jika ada kendala</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopUpSection;
