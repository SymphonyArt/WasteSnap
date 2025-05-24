import { Link } from "react-router-dom";

const PrivateNavbar = () => {
  return (
    <nav className="private-navbar">
      <div className="private-navbar-logo">WasteSnap</div>
      <div className="private-navbar-links">
        <Link to="/beranda" className="private-nav-link">
          Beranda
        </Link>
        <Link to="/pindai" className="private-nav-link">
          Pindai Sampah
        </Link>
        <Link to="/temukan-tps3r" className="private-nav-link">
          Temukan TPS3R
        </Link>
        <Link to="/informasi" className="private-nav-link">
          Informasi
        </Link>
        <button className="logout-button" onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default PrivateNavbar;
