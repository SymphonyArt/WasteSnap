import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicNavbar from "./components/navbar/navbar";
import PrivateNavbar from "./components/navbar/privat-navbar";
import HomePage from "./pages/home-page";
import AboutPage from "./pages/about-page";
import BerandaPage from "./pages/beranda-page";
import kontakPage from "./pages/kontak-page";
import LoginPage from "./pages/auth/login-page";
import RegisterPage from "./pages/auth/register-page";
import ScanWastePage from "./pages/app/scan-page";
import FindTPS3RPage from "./pages/app/tps3r-page";
import InformationPage from "./pages/app/informasi-page";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated ? (
          <PrivateNavbar onLogout={handleLogout} />
        ) : (
          <PublicNavbar />
        )}

        <main className="main-content">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<BerandaPage />} />
            <Route path="/tentang-kami" element={<AboutPage />} />
            <Route path="/kontak" element={<kontakPage />} />
            <Route
              path="/login"
              element={<LoginPage onLogin={handleLogin} />}
            />
            <Route path="/register" element={<RegisterPage />} />

            {/* Private routes */}
            {isAuthenticated ? (
              <>
                <Route path="/" element={<BerandaPage />} />
                <Route path="/pindai" element={<ScanWastePage />} />
                <Route path="/temukan-tps3r" element={<FindTPS3RPage />} />
                <Route path="/informasi" element={<InformationPage />} />
              </>
            ) : (
              <Route path="*" element={<HomePage />} />
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
