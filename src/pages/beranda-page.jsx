import React from "react";
import {
  FaRecycle,
  FaSearch,
  FaMapMarkerAlt,
  FaChartLine,
  FaNewspaper,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/beranda.css";
import image from "../assets/image/daur-ulang.png";

const BerandaPage = () => {
  return (
    <div className="beranda-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Kelola Sampah dengan <span>WasteSnap</span>
          </h1>
          <p>
            Solusi pintar untuk pemilahan sampah dan menemukan TPS3R terdekat
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="primary-button">
              Daftar Sekarang
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src={image} alt="WasteSnap"/>
        </div>
      </section>

      {/* Fitur Section */}
      <section className="features-section">
        <h2 className="judul">Fitur Unggulan</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaRecycle />
            </div>
            <h3>Pemilahan Sampah</h3>
            <p>Ketahui jenis sampah Anda melalui pemindaian cerdas</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaMapMarkerAlt />
            </div>
            <h3>Lokasi TPS3R</h3>
            <p>Temukan tempat pembuangan sampah terdekat di sekitar Anda</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaNewspaper />
            </div>
            <h3>Informasi Terkini</h3>
            <p>Update terbaru seputar pengelolaan sampah</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>Cara Kerja WasteSnap</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Pindai Sampah</h3>
              <p>Gunakan kamera untuk memindai jenis sampah Anda</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Dapatkan Informasi</h3>
              <p>Sistem akan mengenali jenis sampah dan cara pembuangannya</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Temukan TPS3R</h3>
              <p>Lihat lokasi pembuangan terdekat berdasarkan jenis sampah</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Siap Mengelola Sampah dengan Lebih Baik?</h2>
          <p>
            Bergabunglah dengan WasteSnap sekarang dan mulai berkontribusi untuk
            lingkungan yang lebih bersih
          </p>
          <div className="cta-buttons">
            <Link to="/register" className="secondary-button">
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BerandaPage;
