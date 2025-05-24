import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import PublicLayout from "../components/navbar/privat-navbar";
import PrivateLayout from "../components/navbar/navbar";
import HomePage from "../pages/home-page";
import AboutPage from "../pages/about-page";
import LoginPage from "../pages/auth/login-page";
import RegisterPage from "../pages/auth/register-page";
import DashboardPage from "../pages/app/dashboard-page";
import ScanWastePage from "../pages/app/scan-page";
import FindTPS3RPage from "../pages/app/tps3r-page";
import InformationPage from "../pages/app/informasi-page";
import NotFoundPage from "../pages/not-found-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Public routes
      {
        element: <PublicLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "tentang-kami", element: <AboutPage /> },
          { path: "kontak", element: <kontakPage /> },
          {
            path: "login",
            element: <LoginPage />,
            loader: ({ request }) => {
              // Prevent authenticated users from accessing login
              const isAuthenticated = false; // Replace with actual auth check
              if (isAuthenticated) {
                throw new Response("", {
                  status: 302,
                  headers: { Location: "/beranda" },
                });
              }
              return null;
            },
          },
          {
            path: "register",
            element: <RegisterPage />,
            loader: ({ request }) => {
              // Prevent authenticated users from accessing register
              const isAuthenticated = false; // Replace with actual auth check
              if (isAuthenticated) {
                throw new Response("", {
                  status: 302,
                  headers: { Location: "/beranda" },
                });
              }
              return null;
            },
          },
        ],
      },

      // Private routes
      {
        element: <PrivateLayout />,
        loader: ({ request }) => {
          // Protect private routes
          const isAuthenticated = false; // Replace with actual auth check
          if (!isAuthenticated) {
            throw new Response("", {
              status: 302,
              headers: { Location: "/login" },
            });
          }
          return null;
        },
        children: [
          { path: "beranda", element: <DashboardPage /> },
          { path: "pindai", element: <ScanWastePage /> },
          { path: "temukan-tps3r", element: <FindTPS3RPage /> },
          { path: "informasi", element: <InformationPage /> },
        ],
      },

      // Error/fallback routes
      { path: "not-found", element: <NotFoundPage /> },
      { path: "*", element: <Navigate to="/not-found" replace /> },
    ],
  },
]);

export default router;
