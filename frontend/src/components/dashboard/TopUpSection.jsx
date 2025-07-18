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
  CalendarDaysIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import {
  CreditCardIcon as CreditCardIconSolid,
  BanknotesIcon as BanknotesIconSolid,
} from "@heroicons/react/24/solid";
import { useState } from "react";

// Custom scrollbar styles
const scrollbarStyles = `
  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
  }
  .scrollbar-thin::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 6px;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: #a78bfa;
    border-radius: 6px;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #8b5cf6;
  }
  .scrollbar-thin {
    scrollbar-width: thin;
    scrollbar-color: #a78bfa #f1f5f9;
  }
`;

const TopUpSection = ({ userBalance }) => {
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // Sample transaction history data
  const topUpHistory = [
    {
      id: 1,
      amount: 500000,
      method: "Transfer Bank",
      methodIcon: BuildingLibraryIcon,
      bank: "BCA",
      fee: 0,
      status: "completed",
      date: "2025-01-18T10:30:00",
      transactionId: "TU2501180001",
    },
    {
      id: 2,
      amount: 200000,
      method: "E-Wallet",
      methodIcon: DevicePhoneMobileIcon,
      bank: "GoPay",
      fee: 0,
      status: "completed",
      date: "2025-01-17T14:15:00",
      transactionId: "TU2501170001",
    },
    {
      id: 3,
      amount: 100000,
      method: "Virtual Account",
      methodIcon: CreditCardIcon,
      bank: "VA Mandiri",
      fee: 4000,
      status: "completed",
      date: "2025-01-16T09:45:00",
      transactionId: "TU2501160001",
    },
    {
      id: 4,
      amount: 300000,
      method: "QRIS",
      methodIcon: QrCodeIcon,
      bank: "QRIS",
      fee: 0,
      status: "pending",
      date: "2025-01-15T16:20:00",
      transactionId: "TU2501150001",
    },
    {
      id: 5,
      amount: 1000000,
      method: "Transfer Bank",
      methodIcon: BuildingLibraryIcon,
      bank: "BRI",
      fee: 0,
      status: "completed",
      date: "2025-01-14T11:00:00",
      transactionId: "TU2501140001",
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: {
        bg: "bg-green-100",
        text: "text-green-700",
        label: "Berhasil",
      },
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        label: "Pending",
      },
      failed: {
        bg: "bg-red-100",
        text: "text-red-700",
        label: "Gagal",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

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

  const handleLoadMoreHistory = () => {
    setIsLoadingHistory(true);
    // Simulate loading more data
    setTimeout(() => {
      setIsLoadingHistory(false);
      // In real app, this would load more data from API
    }, 1500);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
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
                  <span className="text-white text-sm font-semibold">
                    Aktif
                  </span>
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

        {/* Top Up History Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
          <div className="p-6 border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <CalendarDaysIcon className="w-6 h-6 mr-3 text-indigo-600" />
                Riwayat Top Up
              </h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl transition-colors duration-200">
                <ArrowDownTrayIcon className="w-4 h-4" />
                <span className="text-sm font-medium">Export</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Scrollable Transaction List */}
            <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100 hover:scrollbar-thumb-indigo-400 pr-2">
              <div className="space-y-4">
                {topUpHistory.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100 hover:bg-gray-50 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <transaction.methodIcon className="w-6 h-6 text-indigo-600" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-1">
                          <h4 className="font-semibold text-gray-900 text-lg">
                            {formatCurrency(transaction.amount)}
                          </h4>
                          {getStatusBadge(transaction.status)}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-1 sm:space-y-0">
                          <p className="text-sm text-gray-600 font-medium">
                            {transaction.method} - {transaction.bank}
                          </p>
                          {transaction.fee > 0 && (
                            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full w-fit">
                              Biaya: {formatCurrency(transaction.fee)}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          ID: {transaction.transactionId}
                        </p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 flex justify-between sm:flex-col items-center sm:items-end">
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        {formatDate(transaction.date)}
                      </p>
                      <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium px-3 py-1 rounded-lg hover:bg-indigo-50 transition-colors duration-200">
                        Detail
                      </button>
                    </div>
                  </div>
                ))}

                {/* Loading State */}
                {isLoadingHistory && (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-gray-600">Memuat riwayat...</span>
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {topUpHistory.length === 0 && !isLoadingHistory && (
                  <div className="text-center py-12">
                    <CalendarDaysIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-500 mb-2">
                      Belum Ada Riwayat
                    </h4>
                    <p className="text-gray-400">
                      Riwayat top up akan muncul setelah Anda melakukan
                      transaksi
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Load More Button */}
            <div className="mt-6 text-center">
              <button
                onClick={handleLoadMoreHistory}
                disabled={isLoadingHistory}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 hover:scale-105 shadow-lg ${
                  isLoadingHistory
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
                }`}
              >
                {isLoadingHistory ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Memuat...</span>
                  </div>
                ) : (
                  "Lihat Semua Riwayat"
                )}
              </button>
            </div>

            {/* Summary Stats */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {
                      topUpHistory.filter((t) => t.status === "completed")
                        .length
                    }
                  </div>
                  <div className="text-sm text-green-700 font-medium">
                    Transaksi Berhasil
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-200/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(
                      topUpHistory
                        .filter((t) => t.status === "completed")
                        .reduce((sum, t) => sum + t.amount, 0)
                    )}
                  </div>
                  <div className="text-sm text-blue-700 font-medium">
                    Total Top Up
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(
                      topUpHistory
                        .filter((t) => t.status === "completed")
                        .reduce((sum, t) => sum + t.amount, 0) /
                        topUpHistory.filter((t) => t.status === "completed")
                          .length || 1
                    )}
                  </div>
                  <div className="text-sm text-purple-700 font-medium">
                    Rata-rata
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopUpSection;
