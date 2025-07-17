# Dashboard Components

Folder ini berisi komponen-komponen modular untuk halaman Dashboard Bayaraja yang telah dipecah dari satu file besar menjadi beberapa komponen yang lebih mudah dikelola.

## 📁 Struktur Komponen

### 🔧 Core Layout Components

- **`DashboardSidebar.jsx`** - Sidebar navigation dengan menu utama
- **`DashboardHeader.jsx`** - Header/topbar dengan title dan notifikasi

### 🏠 Overview Tab Components

- **`WelcomeCard.jsx`** - Welcome section dengan balance dan quick top-up
- **`QuickActions.jsx`** - Kategori produk (Pulsa, PLN, Data, Streaming)
- **`StatsSection.jsx`** - Statistik transaksi dengan charts
- **`RecentTransactions.jsx`** - Daftar transaksi terbaru (5 item)

### 📄 Page Components

- **`TransactionsList.jsx`** - Halaman lengkap riwayat transaksi
- **`ProfileSection.jsx`** - Halaman profil pengguna
- **`PlaceholderTab.jsx`** - Placeholder untuk tab yang belum diimplementasi

### 📝 Exports

- **`index.js`** - Barrel exports untuk memudahkan import

## 🚀 Cara Penggunaan

```jsx
import {
  DashboardSidebar,
  DashboardHeader,
  WelcomeCard,
  QuickActions,
  StatsSection,
  RecentTransactions,
  TransactionsList,
  ProfileSection,
  PlaceholderTab,
} from "../components/dashboard";
```

## 🎯 Keuntungan Modularisasi

✅ **Better Code Organization** - Setiap komponen memiliki tanggung jawab yang jelas  
✅ **Easier Maintenance** - Perubahan di satu komponen tidak mempengaruhi yang lain  
✅ **Reusability** - Komponen dapat digunakan ulang di tempat lain  
✅ **Better Testing** - Setiap komponen dapat ditest secara terpisah  
✅ **Team Collaboration** - Developer dapat bekerja pada komponen berbeda  
✅ **Smaller Bundle Size** - Tree shaking lebih efektif

## 📊 Props Interface

### DashboardSidebar

```jsx
{
  activeTab: string,
  setActiveTab: function,
  sidebarOpen: boolean,
  setSidebarOpen: function
}
```

### DashboardHeader

```jsx
{
  activeTab: string,
  setSidebarOpen: function,
  menuItems: array
}
```

### WelcomeCard

```jsx
{
  userBalance: number;
}
```

### StatsSection

```jsx
{
  userPoints: number;
}
```

### RecentTransactions

```jsx
{
  recentTransactions: array,
  setActiveTab: function
}
```

### TransactionsList

```jsx
{
  recentTransactions: array;
}
```

## 🔄 Migration Notes

File `Dashboard.jsx` sekarang jauh lebih sederhana dan mudah dibaca:

- Import statements berkurang drastis
- Logic tiap section terpisah dalam komponen masing-masing
- State management tetap di parent component
- Styling consistency terjaga

## 🎨 Design System

Semua komponen menggunakan:

- **Tailwind CSS** untuk styling
- **Heroicons** untuk icon set
- **Hanken Grotesk** font family
- **Modern light theme** dengan rounded corners
- **Gradient accents** untuk visual hierarchy
- **Consistent spacing** dan shadow system
