import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './styles/Global.css';

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
import Medications from './pages/Medications';
import AnimalDetailsPage from './pages/AnimalDetailsPage';
import FarmAnimalsPage from './pages/FarmAnimalsPage';

// Components
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

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

// Route koruması için özel komponent
const ProtectedRoute = ({ element }) => {
  const { currentUser } = useAuth();

  // Kullanıcı giriş yapmamışsa, login sayfasına yönlendir
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Kullanıcı giriş yapmışsa, istenilen sayfayı göster
  return element;
};

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute element={<VeterinerDashboard />} />} />
            <Route path="/veteriner-dashboard" element={<ProtectedRoute element={<VeterinerDashboard />} />} />
            <Route path="/vet-dashboard" element={<ProtectedRoute element={<VetDashboard />} />} />
            <Route path="/owner-animals/:ownerId" element={<ProtectedRoute element={<OwnerAnimals />} />} />
            <Route path="/animal-details/:animalId" element={<ProtectedRoute element={<AnimalDetails />} />} />
            <Route path="/animals/:id" element={<ProtectedRoute element={<AnimalDetailsPage />} />} />
            <Route path="/search" element={<ProtectedRoute element={<SearchPage />} />} />
            <Route path="/vaccines" element={<ProtectedRoute element={<Vaccines />} />} />
            <Route path="/medications" element={<ProtectedRoute element={<Medications />} />} />
            <Route path="/animals" element={<ProtectedRoute element={<VeterinerDashboard />} />} />
            <Route path="/treatments" element={<ProtectedRoute element={<VeterinerDashboard />} />} />
            <Route path="/animal-records" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/admin" element={<ProtectedRoute element={<AdminPanel />} />} />
            <Route path="/users" element={<ProtectedRoute element={<UserManagement />} />} />
            <Route path="/new-patient" element={<ProtectedRoute element={<NewPatient />} />} />
            <Route path="/farm-animals" element={<ProtectedRoute element={<FarmAnimalsPage />} />} />

            {/* Form Routes */}
            <Route path="/forms" element={<ProtectedRoute element={<FormsLayout />} />} />
            <Route path="/forms/:formType" element={<ProtectedRoute element={<FormsLayout />} />} />

            {/* Default Routes */}
            <Route path="/" element={<ProtectedRoute element={<Navigate to="/dashboard" />} />} />
            <Route path="*" element={<ProtectedRoute element={<Navigate to="/login" />} />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
