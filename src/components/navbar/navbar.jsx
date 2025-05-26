import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaRecycle, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import "../../styles/navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogoutClick = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setIsMobileMenuOpen(false)}>
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
          {isAuthenticated ? (
            <>
              <Link to="/pindai" className="nav-link">
                Pindai Sampah
              </Link>
              <Link to="/temukan-tps3r" className="nav-link">
                Temukan TPS3R
              </Link>
              <Link to="/informasi" className="nav-link">
                Informasi
              </Link>
              <button onClick={handleLogoutClick} className="nav-button logout-btn">
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

        {isAuthenticated ? (
          <>
            <Link
              to="/pindai"
              className="mobile-nav-link"
              onClick={toggleMobileMenu}
            >
              Pindai Sampah
            </Link>
            <Link
              to="/temukan-tps3r"
              className="mobile-nav-link"
              onClick={toggleMobileMenu}
            >
              Temukan TPS3R
            </Link>
            <Link
              to="/informasi"
              className="mobile-nav-link"
              onClick={toggleMobileMenu}
            >
              Informasi
            </Link>
            <button
              onClick={handleLogoutClick}
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