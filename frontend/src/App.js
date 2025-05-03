import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Pages
import LoginPage from './pages/LoginPage';
import VeterinerDashboard from './pages/VeterinerDashboard';
import VetDashboard from './pages/VetDashboard';
import OwnerAnimals from './pages/OwnerAnimals';
import AnimalDetails from './pages/AnimalDetails';
import SearchPage from './pages/SearchPage';
import Vaccines from './pages/Vaccines';
import FormsPage from './pages/forms/FormsPage';
import NewPatient from './pages/NewPatient';

// Components
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar';

// Context
import { AuthProvider } from './context/AuthContext';

// Geçici Dashboard bileşeni
const Dashboard = () => (
  <>
    <NavBar />
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p>Hoş geldiniz! Burası dashboard sayfasıdır.</p>
    </div>
  </>
);

// Admin panel
const AdminPanel = () => (
  <>
    <NavBar />
    <div className="dashboard-container">
      <h1>Admin Panel</h1>
      <p>Sistem yöneticilerine özel içerik burada gösterilir.</p>
    </div>
  </>
);

// Kullanıcı Yönetimi
const UserManagement = () => (
  <>
    <NavBar />
    <div className="dashboard-container">
      <h1>Kullanıcı Yönetimi</h1>
      <p>Sistem kullanıcılarını buradan yönetebilirsiniz.</p>
    </div>
  </>
);

// Geçici Unauthorized bileşeni
const Unauthorized = () => (
  <div className="unauthorized-container">
    <h1>Yetkisiz Erişim</h1>
    <p>Bu sayfaya erişim yetkiniz bulunmamaktadır.</p>
    <a href="/login" className="login-link">Giriş Sayfasına Dön</a>
  </div>
);

// Formlar Sayfası Layout
const FormsLayout = () => (
  <>
    <NavBar />
    <FormsPage />
  </>
);

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<VeterinerDashboard />} />
            <Route path="/veteriner-dashboard" element={<VeterinerDashboard />} />
            <Route path="/vet-dashboard" element={<VetDashboard />} />
            <Route path="/owner-animals/:ownerId" element={<OwnerAnimals />} />
            <Route path="/animal-details/:animalId" element={<AnimalDetails />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/vaccines" element={<Vaccines />} />
            <Route path="/animals" element={<VeterinerDashboard />} />
            <Route path="/treatments" element={<VeterinerDashboard />} />
            <Route path="/animal-records" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/new-patient" element={<NewPatient />} />

            {/* Form Routes */}
            <Route path="/forms" element={<FormsLayout />} />
            <Route path="/forms/:formType" element={<FormsLayout />} />

            {/* Default Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
