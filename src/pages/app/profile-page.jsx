import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../service/api";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaEdit } from "react-icons/fa";
import "../../styles/profile.css";
// import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/auth/profile");
        setProfile(response.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {profile?.name?.charAt(0).toUpperCase() || <FaUser />}
        </div>
        <h2>{profile?.name || "Pengguna"}</h2>
        <p className="profile-email">{profile?.email}</p>
      </div>

      <div className="profile-details">
        <div className="detail-item">
          <FaUser className="detail-icon" />
          <div>
            <p className="detail-label">Nama Lengkap</p>
            <p className="detail-value">{profile?.name || "-"}</p>
          </div>
        </div>

        <div className="detail-item">
          <FaEnvelope className="detail-icon" />
          <div>
            <p className="detail-label">Email</p>
            <p className="detail-value">{profile?.email || "-"}</p>
          </div>
        </div>

        <div className="detail-item">
          <FaPhone className="detail-icon" />
          <div>
            <p className="detail-label">Telepon</p>
            <p className="detail-value">{profile?.phone || "-"}</p>
          </div>
        </div>

        <div className="detail-item">
          <FaMapMarkerAlt className="detail-icon" />
          <div>
            <p className="detail-label">Alamat</p>
            <p className="detail-value">{profile?.address || "-"}</p>
          </div>
        </div>

        <div className="detail-item">
          <FaCalendarAlt className="detail-icon" />
          <div>
            <p className="detail-label">Bergabung</p>
            <p className="detail-value">
              {new Date(profile?.created_at).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="profile-actions">
         <button 
            className="btn-edit"
            onClick={() => navigate("/profile/edit")} 
            >
            <FaEdit /> Edit Profil
        </button>
        <button className="btn-logout" onClick={logout}>
          Keluar
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;