import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaRecycle, FaBars, FaTimes } from "react-icons/fa";
import "../../styles/navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <FaRecycle className="logo-icon" />
          <span>WasteSnap</span>
        </Link>

        {/* Desktop Menu */}
        <div className="navbar-center-links">
          <Link to="/" className="nav-link">
            Beranda
          </Link>
          <Link to="/tentang-kami" className="nav-link">
            Tentang Kami
          </Link>
          <Link to="/kontak" className="nav-link">
            Kontak
          </Link>
        </div>

        <div className="navbar-right-links">
          {isLoggedIn ? (
            <>
              <Link to="/scan" className="nav-link">
                Pindai Sampah
              </Link>
              <Link to="/tps3r" className="nav-link">
                Temukan TPS3R
              </Link>
              <Link to="/info" className="nav-link">
                Informasi
              </Link>
              <button onClick={handleLogout} className="nav-button logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-button register-btn">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
        <Link to="/" className="mobile-nav-link" onClick={toggleMobileMenu}>
          Beranda
        </Link>
        <Link
          to="/tentang-kami"
          className="mobile-nav-link"
          onClick={toggleMobileMenu}
        >
          Tentang Kami
        </Link>
        <Link
          to="/kontak"
          className="mobile-nav-link"
          onClick={toggleMobileMenu}
        >
          Kontak
        </Link>

        {isLoggedIn ? (
          <>
            <Link
              to="/scan"
              className="mobile-nav-link"
              onClick={toggleMobileMenu}
            >
              Pindai Sampah
            </Link>
            <Link
              to="/tps3r"
              className="mobile-nav-link"
              onClick={toggleMobileMenu}
            >
              Temukan TPS3R
            </Link>
            <Link
              to="/info"
              className="mobile-nav-link"
              onClick={toggleMobileMenu}
            >
              Informasi
            </Link>
            <button
              onClick={handleLogout}
              className="mobile-nav-button logout-btn"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="mobile-nav-link"
              onClick={toggleMobileMenu}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="mobile-nav-button register-btn"
              onClick={toggleMobileMenu}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
