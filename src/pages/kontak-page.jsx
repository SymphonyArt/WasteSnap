import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const KontakPage = () => {
  return (
    <div className="contact-container">
      <h1>Hubungi Kami</h1>

      <div className="contact-methods">
        <div className="contact-card">
          <FaPhone className="contact-icon" />
          <h3>Telepon</h3>
          <p>+62 123 4567 890</p>
        </div>

        <div className="contact-card">
          <FaEnvelope className="contact-icon" />
          <h3>Email</h3>
          <p>kontak@wastesnap.id</p>
        </div>

        <div className="contact-card">
          <FaMapMarkerAlt className="contact-icon" />
          <h3>Alamat</h3>
          <p>Jl. Contoh No. 123, Jakarta</p>
        </div>
      </div>

      <div className="contact-form">
        <h2>Kirim Pesan</h2>
        <form>
          <input type="text" placeholder="Nama Anda" required />
          <input type="email" placeholder="Email Anda" required />
          <textarea placeholder="Pesan Anda" rows="5" required></textarea>
          <button type="submit">Kirim</button>
        </form>
      </div>
    </div>
  );
};

export default KontakPage;
