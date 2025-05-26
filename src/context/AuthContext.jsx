import { createContext, useContext, useState, useEffect } from "react";
import api from "../service/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const response = await api.get("/auth/profile");
          setIsAuthenticated(true);
          setUser(response.data);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (token) => {
    localStorage.setItem("authToken", token);
    try {
      const response = await api.get("/auth/profile");
      setIsAuthenticated(true);
      setUser(response.data);
    } catch (error) {
      console.error("Login error:", error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        logout
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};