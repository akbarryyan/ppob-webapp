import { Link } from "react-router-dom";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  ArrowTopRightOnSquareIcon,
  CreditCardIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Pulsa & Paket Data", href: "/services/pulsa" },
      { name: "Token PLN", href: "/services/pln" },
      { name: "E-Wallet", href: "/services/ewallet" },
      { name: "Gaming Voucher", href: "/services/gaming" },
      { name: "TV & Internet", href: "/services/tv-internet" },
      { name: "Streaming", href: "/services/streaming" },
    ],
    company: [
      { name: "Tentang Kami", href: "/about" },
      { name: "Karir", href: "/careers" },
      { name: "Press Kit", href: "/press" },
      { name: "Blog", href: "/blog" },
      { name: "Partnership", href: "/partnership" },
      { name: "Investor", href: "/investor" },
    ],
    support: [
      { name: "Pusat Bantuan", href: "/help" },
      { name: "Cara Pembayaran", href: "/payment-methods" },
      { name: "Status Server", href: "/status" },
      { name: "API Documentation", href: "/api-docs" },
      { name: "Tutorial", href: "/tutorials" },
      { name: "FAQ", href: "/faq" },
    ],
    legal: [
      { name: "Syarat & Ketentuan", href: "/terms" },
      { name: "Kebijakan Privasi", href: "/privacy" },
      { name: "Kebijakan Cookie", href: "/cookies" },
      { name: "Kebijakan Refund", href: "/refund" },
      { name: "Disclaimer", href: "/disclaimer" },
      { name: "Lisensi", href: "/license" },
    ],
  };

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com/bayaraja",
      icon: "facebook",
      color: "hover:text-blue-600",
    },
    {
      name: "Twitter",
      href: "https://twitter.com/bayaraja",
      icon: "twitter",
      color: "hover:text-blue-400",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/bayaraja",
      icon: "instagram",
      color: "hover:text-pink-600",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/bayaraja",
      icon: "linkedin",
      color: "hover:text-blue-700",
    },
    {
      name: "YouTube",
      href: "https://youtube.com/bayaraja",
      icon: "youtube",
      color: "hover:text-red-600",
    },
  ];

  const contactInfo = [
    {
      icon: PhoneIcon,
      label: "Customer Service",
      value: "+62 21 1234 5678",
      detail: "24/7 Support",
    },
    {
      icon: EnvelopeIcon,
      label: "Email Support",
      value: "support@bayaraja.id",
      detail: "Response < 2 jam",
    },
    {
      icon: MapPinIcon,
      label: "Kantor Pusat",
      value: "Jakarta, Indonesia",
      detail: "Senin - Jumat, 09:00 - 18:00",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      label: "Live Chat",
      value: "Chat dengan kami",
      detail: "Online sekarang",
    },
  ];

  const paymentMethods = [
    "BCA",
    "Mandiri",
    "BNI",
    "BRI",
    "CIMB",
    "Permata",
    "OVO",
    "GoPay",
    "DANA",
    "LinkAja",
    "ShopeePay",
    "Visa",
    "Mastercard",
    "Alfamart",
    "Indomaret",
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full filter blur-3xl"></div>

      <div className="relative">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <Link to="/" className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <CreditCardIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Bayaraja
                  </span>
                </Link>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Platform pembayaran digital terpercaya untuk semua kebutuhan
                  top up Anda. Transaksi aman, cepat, dan mudah dengan harga
                  terbaik.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white">
                  Keamanan & Sertifikasi:
                </h4>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg">
                    <ShieldCheckIcon className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-gray-300">SSL Secure</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg">
                    <ShieldCheckIcon className="w-5 h-5 text-blue-400" />
                    <span className="text-sm text-gray-300">ISO 27001</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg">
                    <ShieldCheckIcon className="w-5 h-5 text-purple-400" />
                    <span className="text-sm text-gray-300">PCI DSS</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Follow Us:</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-gray-700 ${social.color} hover:scale-110`}
                    >
                      <span className="sr-only">{social.name}</span>
                      <GlobeAltIcon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-4 grid md:grid-cols-4 gap-8">
              {/* Products */}
              <div>
                <h3 className="font-semibold text-white mb-6 text-lg">
                  Produk
                </h3>
                <ul className="space-y-3">
                  {footerLinks.product.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="font-semibold text-white mb-6 text-lg">
                  Perusahaan
                </h3>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="font-semibold text-white mb-6 text-lg">
                  Bantuan
                </h3>
                <ul className="space-y-3">
                  {footerLinks.support.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="font-semibold text-white mb-6 text-lg">Legal</h3>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact & Payment Methods */}
          <div className="grid lg:grid-cols-2 gap-12 mt-16 pt-12 border-t border-gray-800">
            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-white mb-6 text-lg">
                Hubungi Kami
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {contactInfo.map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors duration-300"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <contact.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-white text-sm">
                        {contact.label}
                      </div>
                      <div className="text-blue-400 text-sm mb-1">
                        {contact.value}
                      </div>
                      <div className="text-xs text-gray-400">
                        {contact.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="font-semibold text-white mb-6 text-lg">
                Metode Pembayaran
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">
                    Bank & E-Wallet:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {paymentMethods.map((method, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 bg-gray-800 text-gray-300 rounded-lg text-xs font-medium hover:bg-gray-700 transition-colors"
                      >
                        {method}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">
                    Platform:
                  </h4>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg">
                      <DevicePhoneMobileIcon className="w-5 h-5 text-blue-400" />
                      <span className="text-sm text-gray-300">Mobile App</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg">
                      <ComputerDesktopIcon className="w-5 h-5 text-purple-400" />
                      <span className="text-sm text-gray-300">
                        Web Platform
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-gray-400">
                © {currentYear} Bayaraja Indonesia. All rights reserved. |{" "}
                <span className="text-blue-400">Made with ❤️ in Indonesia</span>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span>Terdaftar dan diawasi oleh:</span>
                <div className="flex items-center space-x-4">
                  <span className="px-2 py-1 bg-gray-800 rounded text-xs">
                    OJK
                  </span>
                  <span className="px-2 py-1 bg-gray-800 rounded text-xs">
                    BI
                  </span>
                  <span className="px-2 py-1 bg-gray-800 rounded text-xs">
                    Kominfo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-8 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-1/4 right-16 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
      <div className="absolute top-3/4 left-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
    </footer>
  );
};

export default Footer;
