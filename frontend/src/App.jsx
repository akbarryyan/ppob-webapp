import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/AuthContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import router from "./router";
import "react-toastify/dist/ReactToastify.css";
// import "./App.css";

function App() {
  return (
    <SettingsProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="!font-sans"
          bodyClassName="!font-sans !text-gray-800"
        />
      </AuthProvider>
    </SettingsProvider>
  );
}

export default App;
