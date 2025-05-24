import React from "react";
import "../styles/about.css";
import image from "../assets/image/about.png";

const AboutPage = () => {
  return (
    <section className="about-section">
      {/* Bagian 1: Tentang Kami */}
      <div className="about-wrapper container">
        <div className="about-text">
          <h1 className="about-title">Tentang Kami</h1>
          <p className="about-description">
            Kami hadir dengan solusi berbasis AI untuk mengatasi masalah sampah
            yang terus meningkat. Melalui teknologi machine learning, pengguna
            dapat mengenali jenis sampah hanya dengan memindai gambar. Kami juga
            menyediakan panduan interaktif dalam mengolah sampah organik menjadi
            kompos, serta mendaur ulang sampah anorganik menjadi barang yang
            berguna.
          </p>
        </div>
        <div className="about-image">
          <img src={image} alt="Ilustrasi Tentang Kami" className="img-fluid" />
        </div>
      </div>

      {/* Bagian 2: Misi Kami - Medical Theme */}
      <div className="mission-section container">
        <h2 className="section-title">Misi Kami</h2>
        <p className="section-subtitle">
          Komitmen kami terhadap kesehatan lingkungan dan masyarakat
        </p>

        <div className="mission-grid">
          <div className="mission-card">
            <div className="mission-icon">🏥</div>
            <h3>Pengelolaan Limbah Medis</h3>
            <p>
              Menyediakan solusi khusus untuk pemilahan dan pengolahan limbah
              medis yang aman sesuai standar kesehatan.
            </p>
          </div>

          <div className="mission-card">
            <div className="mission-icon">🦠</div>
            <h3>Pencegahan Infeksi</h3>
            <p>
              Meminimalisir risiko penularan penyakit melalui pengelolaan sampah
              medis yang tepat dan hygienis.
            </p>
          </div>

          <div className="mission-card">
            <div className="mission-icon">💊</div>
            <h3>Pengelolaan Obat Kadaluarsa</h3>
            <p>
              Sistem khusus untuk pembuangan obat-obatan kadaluarsa yang ramah
              lingkungan dan mencegah penyalahgunaan.
            </p>
          </div>

          <div className="mission-card">
            <div className="mission-icon">🌡️</div>
            <h3>Alat Kesehatan Berkelanjutan</h3>
            <p>
              Program daur ulang alat kesehatan sekali pakai yang memenuhi
              standar sterilitas dan keamanan.
            </p>
          </div>
        </div>
      </div>

      {/* Bagian 3: Team Kami */}
    </section>
  );
};

export default AboutPage;
