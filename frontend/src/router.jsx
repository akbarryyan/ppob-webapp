import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import LoginAdmin from "./pages/LoginAdmin";
import ForgotPasswordAdmin from "./pages/ForgotPasswordAdmin";
import NewTransaction from "./pages/NewTransaction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/:section",
    element: <Dashboard />,
  },
  {
    path: "/admin/login",
    element: <LoginAdmin />,
  },
  {
    path: "/admin/forgot-password",
    element: <ForgotPasswordAdmin />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/:section",
    element: <AdminDashboard />,
  },
  {
    path: "/new-transaction",
    element: <NewTransaction />,
  },
]);

export default router;
