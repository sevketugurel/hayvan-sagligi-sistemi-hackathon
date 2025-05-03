import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Pages
import LoginPage from './pages/LoginPage';
import VetDashboard from './pages/VetDashboard';
import OwnerAnimals from './pages/OwnerAnimals';
import AnimalDetails from './pages/AnimalDetails';

// Components
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar';

// Context
import { AuthProvider } from './context/AuthContext';

// Geçici Dashboard bileşeni - gerçek uygulama için ayrı bir dosyada oluşturulacak
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

// Geçici Unauthorized bileşeni - gerçek uygulama için ayrı bir dosyada oluşturulacak
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
            
            {/* Protected Routes - Herhangi bir authentication gerektiren rotalar */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Add more private routes here */}
            </Route>
            
            {/* Veteriner Rotaları - Veteriner rolü ve animal:view izni gerektirir */}
            <Route element={<PrivateRoute 
                requiredRole="vet" 
                requiredPermission="animal:view" 
              />}>
              <Route path="/vet-dashboard" element={<VetDashboard />} />
              <Route path="/owner-animals/:ownerId" element={<OwnerAnimals />} />
              <Route path="/animal-details/:animalId" element={<AnimalDetails />} />
              <Route path="/animals" element={<VetDashboard />} />
              <Route path="/treatments" element={<VetDashboard />} />
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
            
            {/* Redirect to login page for undefined routes */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
