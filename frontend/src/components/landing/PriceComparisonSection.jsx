import {
  PhoneIcon,
  SparklesIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";

const PriceComparisonSection = () => {
  const priceComparison = [
    {
      operator: "Telkomsel",
      our_price: "49.500",
      competitor: "52.000",
      savings: "2.500",
    },
    {
      operator: "Indosat",
      our_price: "48.000",
      competitor: "50.500",
      savings: "2.500",
    },
    {
      operator: "XL",
      our_price: "47.500",
      competitor: "49.000",
      savings: "1.500",
    },
    {
      operator: "Tri",
      our_price: "45.000",
      competitor: "47.000",
      savings: "2.000",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Bandingkan Harga,{" "}
            <span className="text-green-600">Hemat Lebih Banyak!</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Kami berkomitmen memberikan harga terbaik. Lihat perbandingan harga
            pulsa 50K di bawah ini!
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <h3 className="text-2xl font-bold text-white text-center">
              Perbandingan Harga Pulsa 50K
            </h3>
            <p className="text-blue-100 text-center mt-2">
              Update terakhir: Hari ini
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-8 py-4 text-left font-semibold text-gray-900">
                    Operator
                  </th>
                  <th className="px-8 py-4 text-center font-semibold text-gray-900">
                    Harga TopUp
                  </th>
                  <th className="px-8 py-4 text-center font-semibold text-gray-900">
                    Harga Kompetitor
                  </th>
                  <th className="px-8 py-4 text-center font-semibold text-gray-900">
                    Hemat
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {priceComparison.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                          <PhoneIcon className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-semibold text-gray-900">
                          {item.operator}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="text-2xl font-bold text-green-600">
                        Rp {item.our_price}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="text-xl text-gray-500 line-through">
                        Rp {item.competitor}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                        <HandThumbUpIcon className="w-4 h-4 mr-1" />
                        Rp {item.savings}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-yellow-50 px-8 py-6 border-t border-yellow-200">
            <div className="flex items-center justify-center text-yellow-800">
              <SparklesIcon className="w-5 h-5 mr-2" />
              <span className="font-semibold">
                Bonus: Dapatkan cashback hingga 5% untuk setiap transaksi!
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceComparisonSection;
