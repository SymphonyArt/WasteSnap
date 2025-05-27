import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FaRecycle, FaBars, FaTimes, FaUser, FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import "../../styles/navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setIsMobileMenuOpen(false)}>
          <FaRecycle className="logo-icon" />
          <span>WasteSnap</span>
        </Link>

        <div className="navbar-center-links">
          <Link to="/" className="nav-link">
            Beranda
          </Link>
          <Link to="/tentang-kami" className="nav-link">
            Tentang Kami
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
              
              <div className="profile-dropdown" ref={dropdownRef}>
                <button 
                  className="profile-trigger"
                  onClick={toggleProfileDropdown}
                  aria-label="Profile menu"
                >
                  <div className="profile-avatar-sm">
                    {user?.name?.charAt(0).toUpperCase() || <FaUser />}
                  </div>
                  <FaChevronDown className={`dropdown-arrow ${isProfileDropdownOpen ? "open" : ""}`} />
                </button>
                
                <div className={`dropdown-content ${isProfileDropdownOpen ? "show" : ""}`}>
                  <Link 
                    to="/profile" 
                    className="dropdown-item"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <FaUser className="dropdown-icon" />
                    <span>Profil Saya</span>
                  </Link>
                  <button 
                    className="dropdown-item"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="dropdown-icon" />
                    <span>Keluar</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Masuk
              </Link>
              <Link to="/register" className="nav-button register-btn">
                Daftar
              </Link>
            </>
          )}
        </div>

        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
        {/* ... (keep existing mobile menu code) ... */}
      </div>
    </nav>
  );
};

export default Navbar;