import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/auth/register-form";
import api from "../../service/api";
import "../../styles/auth.css";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/register", formData);
      localStorage.setItem("authToken", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registrasi gagal. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-section">
        <div className="auth-card">
          <h2 className="auth-title">Daftar Akun</h2>
          <RegisterForm
            onSubmit={handleRegister}
            isLoading={isLoading}
            error={error}
          />
          <p className="auth-footer">
            Sudah punya akun? <a href="/login">Masuk di sini</a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
