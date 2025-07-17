# 💳 PPOB WebApp - Payment Point Online Bank

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
</div>

<div align="center">
  <h3>🚀 Modern PPOB (Payment Point Online Bank) Web Application</h3>
  <p>A full-stack Single Page Application for digital payment services with seamless user experience</p>
</div>

---

## ✨ Features

### 🎯 Core Features

- **💰 Multi-Payment Services**: Pulsa, Paket Data, Token Listrik, dan lebih banyak lagi
- **👤 User Authentication**: Secure login/register dengan Laravel Sanctum
- **📱 Responsive Design**: Perfect di desktop, tablet, dan mobile
- **⚡ Real-time Updates**: Live status transaksi dan notifikasi
- **📊 Transaction History**: Riwayat lengkap semua transaksi
- **🔒 Secure Payments**: Integrasi langsung dengan Digiflazz API

### 🛠 Technical Features

- **SPA Architecture**: Single Page Application untuk performa optimal
- **RESTful API**: Clean dan well-documented API endpoints
- **Modern UI/UX**: Beautiful interface dengan Tailwind CSS
- **State Management**: Efficient state handling dengan React hooks
- **Error Handling**: Comprehensive error handling dan user feedback
- **Loading States**: Smooth loading indicators untuk better UX

## 🏗 Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Digiflazz     │
│   (React SPA)   │◄──►│   (Laravel API) │◄──►│     API         │
│                 │    │                 │    │                 │
│ • React.js      │    │ • Laravel 11    │    │ • PPOB Services │
│ • Tailwind CSS  │    │ • Sanctum Auth  │    │ • Price List    │
│ • Vite         │    │ • MySQL DB      │    │ • Transactions  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18+)
- **PHP** (v8.2+)
- **Composer**
- **MySQL** (v8.0+)
- **Git**

### 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/akbarryyan/ppob-webapp.git
   cd ppob-webapp
   ```

2. **Setup Backend (Laravel)**

   ```bash
   cd backend
   composer install
   cp .env.example .env
   php artisan key:generate

   # Create MySQL database and update .env file
   # DB_CONNECTION=mysql
   # DB_HOST=127.0.0.1
   # DB_PORT=3306
   # DB_DATABASE=ppob_webapp
   # DB_USERNAME=your_username
   # DB_PASSWORD=your_password

   php artisan migrate --seed
   php artisan serve
   ```

3. **Setup Frontend (React)**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Configure Environment**
   - Update `.env` dengan Digiflazz API credentials
   - Set MySQL database connection
   - Configure CORS settings

## 📁 Project Structure

```
ppob-webapp/
├── 🎨 frontend/                 # React SPA
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   ├── hooks/             # Custom React hooks
│   │   └── utils/             # Helper functions
│   └── package.json
│
├── ⚙️ backend/                  # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/  # API controllers
│   │   ├── Models/           # Eloquent models
│   │   └── Services/         # Business logic
│   ├── database/
│   │   ├── migrations/       # Database schema
│   │   └── seeders/         # Sample data
│   └── routes/api.php       # API routes
│
└── 📖 README.md
```

## 🛣 API Endpoints

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| `POST` | `/api/register`    | User registration   |
| `POST` | `/api/login`       | User authentication |
| `GET`  | `/api/products`    | Get PPOB products   |
| `POST` | `/api/transaction` | Create transaction  |
| `GET`  | `/api/history`     | Transaction history |
| `GET`  | `/api/balance`     | User balance        |

## 🎨 UI Preview

### 🏠 Homepage

- Clean dan modern landing page
- Quick access ke semua layanan PPOB
- Real-time product prices

### 💳 Payment Flow

- Step-by-step payment process
- Input validation dan error handling
- Payment confirmation dengan details lengkap

### 📊 Dashboard

- User profile management
- Transaction history dengan filter
- Balance dan quick actions

## 🔐 Security Features

- **🛡 Authentication**: Laravel Sanctum untuk secure API access
- **🔒 Input Validation**: Comprehensive validation di frontend dan backend
- **🚫 CSRF Protection**: Built-in Laravel CSRF protection
- **⚡ Rate Limiting**: API rate limiting untuk prevent abuse
- **🔐 Secure Headers**: Security headers untuk XSS protection

## 🤝 Contributing

Kami menyambut kontribusi dari developer lain! Berikut cara berkontribusi:

1. **Fork** repository ini
2. **Create** feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** ke branch (`git push origin feature/AmazingFeature`)
5. **Open** Pull Request

## 📝 Development Roadmap

- [ ] 🔔 Push notifications untuk status transaksi
- [ ] 📱 Progressive Web App (PWA) support
- [ ] 🌙 Dark mode implementation
- [ ] 📊 Advanced analytics dashboard
- [ ] 🤖 Chatbot integration untuk customer support
- [ ] 💎 Premium membership features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Akbar Ryan**

- GitHub: [@akbarryyan](https://github.com/akbarryyan)
- Email: [your-email@example.com](mailto:your-email@example.com)

---

<div align="center">
  <p>⭐ Don't forget to star this repository if you found it helpful!</p>
  <p>Made with ❤️ by <a href="https://github.com/akbarryyan">Akbar Ryan</a></p>
</div>
