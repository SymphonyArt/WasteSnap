import { useEffect } from "react";
import Navbar from "./components/navbar/navbar";
import AppRoutes from "./routes/routes";
import { useAuth } from "./context/AuthContext";
import "./App.css";

const App = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Memuat aplikasi...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <AppRoutes />
      </div>
    </div>
  );
};

export default App;