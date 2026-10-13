import { Routes, Route } from "react-router-dom";
import PublicLayout from "@/app/layouts/PublicLayout";
import HomePage from "@/features/public/home/HomePage";
import AboutPage from "@/features/public/about/AboutPage";
import ServicesPage from "@/features/public/services/ServicesPage";
import DoctorsPage from "@/features/public/doctors/DoctorsPage";
import ContactPage from "@/features/public/contact/ContactPage";
import LoginPage from "@/features/public/login/LoginPage";
import RegisterPage from "@/features/public/login/RegisterPage";
import AdminDashboard from "@/features/admin/AdminDashboard";
import { routes } from "@/config/siteContent";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.about} element={<AboutPage />} />
        <Route path={routes.services} element={<ServicesPage />} />
        <Route path={routes.doctors} element={<DoctorsPage />} />
        <Route path={routes.contact} element={<ContactPage />} />
      </Route>
      {/* Login has no public header/footer chrome */}
      <Route path={routes.login} element={<LoginPage />} />
      <Route path={routes.register} element={<RegisterPage />} />
      <Route path={routes.adminLogin} element={<LoginPage />} />
      <Route path={routes.adminDashboard} element={<AdminDashboard />} />
    </Routes>
  );
}
