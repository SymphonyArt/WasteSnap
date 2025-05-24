import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/auth/login-form";
import api from "../../service/api";
import "../../styles/auth.css";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", formData);
      localStorage.setItem("authToken", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-section">
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
      </section>
    </main>
  );
};

export default LoginPage;
