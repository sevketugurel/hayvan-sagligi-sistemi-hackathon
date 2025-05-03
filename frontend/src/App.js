import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Pages
import LoginPage from './pages/LoginPage';
import VeterinerDashboard from './pages/VeterinerDashboard';

// Components
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar';

// Context
import { AuthProvider } from './context/AuthContext';

// Geçici Dashboard bileşeni
const Dashboard = () => {
  return (
    <>
      <NavBar />
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <p>Hoş geldiniz! Burası dashboard sayfasıdır.</p>
      </div>
    </>
  );
};

// Veteriner özel dashboard - gerçek uygulama için ayrı bir dosyada oluşturulacak
const VetDashboard = () => {
  return (
    <>
      <NavBar />
      <div className="dashboard-container">
        <h1>Veteriner Dashboard</h1>
        <p>Hoş geldiniz! Burası veterinerlere özel dashboard sayfasıdır.</p>
      </div>
    </>
  );
};

// Admin panel - gerçek uygulama için ayrı bir dosyada oluşturulacak
const AdminPanel = () => {
  return (
    <>
      <NavBar />
      <div className="dashboard-container">
        <h1>Admin Panel</h1>
        <p>Sistem yöneticilerine özel içerik burada gösterilir.</p>
      </div>
    </>
  );
};

// Kullanıcı Yönetimi - sadece admin rolü ve users:view izni olanlar görebilir
const UserManagement = () => {
  return (
    <>
      <NavBar />
      <div className="dashboard-container">
        <h1>Kullanıcı Yönetimi</h1>
        <p>Sistem kullanıcılarını buradan yönetebilirsiniz.</p>
      </div>
    </>
  );
};

// Geçici Unauthorized bileşeni
const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <h1>Yetkisiz Erişim</h1>
      <p>Bu sayfaya erişim yetkiniz bulunmamaktadır.</p>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Veteriner Dashboard - Veteriner rolü gerektirir */}
            <Route element={<PrivateRoute
              requiredRole="vet"
              requiredPermission="animal:view"
            />}>
              <Route path="/vet-dashboard" element={<VeterinerDashboard />} />
            </Route>

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<VeterinerDashboard />} />
              {/* Buraya daha fazla route eklenebilir */}
            </Route>

            {/* Teknisyen Rotaları - Teknisyen veya veteriner rolüne sahip olmalı */}
            <Route element={<PrivateRoute
              requiredRole={['technician', 'vet']}
              requiredPermission="animal:view"
            />}>
              <Route path="/animal-records" element={<Dashboard />} />
            </Route>

            {/* Admin Rotaları - Admin rolü gerektirir */}
            <Route element={<PrivateRoute requiredRole="admin" />}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route>

            {/* Kullanıcı Yönetimi - Admin rolü VE users:view iznine sahip olmalı */}
            <Route element={<PrivateRoute
              requiredRole="admin"
              requiredPermission={['users:view', 'users:update']}
            />}>
              <Route path="/users" element={<UserManagement />} />
            </Route>

            {/* Default yönlendirmeler */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
