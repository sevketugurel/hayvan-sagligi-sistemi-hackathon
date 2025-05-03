import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Pages
import LoginPage from './pages/LoginPage';
import VeterinerDashboard from './pages/VeterinerDashboard';
import OwnerAnimals from './pages/OwnerAnimals';
import AnimalDetails from './pages/AnimalDetails';
import SearchPage from './pages/SearchPage';
import Vaccines from './pages/Vaccines';

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
  </div>
);

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Veteriner Rotaları - Veteriner rolü ve animal:view izni gerektirir */}
            <Route element={
              <PrivateRoute
                requiredRole="vet"
                requiredPermission="animal:view"
              />
            }>
              <Route path="/vet-dashboard" element={<VeterinerDashboard />} />
              <Route path="/owner-animals/:ownerId" element={<OwnerAnimals />} />
              <Route path="/animal-details/:animalId" element={<AnimalDetails />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/vaccines" element={<Vaccines />} />
              {/* Ek veteriner sayfaları */}
              <Route path="/animals" element={<VeterinerDashboard />} />
              <Route path="/treatments" element={<VeterinerDashboard />} />
            </Route>

            {/* Teknisyen Rotaları - Teknisyen veya veteriner rolüne sahip olmalı */}
            <Route element={
              <PrivateRoute
                requiredRole={['technician', 'vet']}
                requiredPermission="animal:view"
              />
            }>
              <Route path="/animal-records" element={<Dashboard />} />
            </Route>

            {/* Admin Rotaları - Admin rolü gerektirir */}
            <Route element={<PrivateRoute requiredRole="admin" />}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route>

            {/* Kullanıcı Yönetimi - Admin rolü VE users:view iznine sahip olmalı */}
            <Route element={
              <PrivateRoute
                requiredRole="admin"
                requiredPermission={['users:view', 'users:update']}
              />
            }>
              <Route path="/users" element={<UserManagement />} />
            </Route>

            {/* Default yönlendirmeler */}
            <Route path="/" element={<Navigate to="/vet-dashboard" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
