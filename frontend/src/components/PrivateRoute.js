import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

/**
 * PrivateRoute bileşeni, kimlik doğrulaması olmadan
 * korumalı sayfalara erişimi engeller, ayrıca rol ve izin kontrolü yapar
 * 
 * @param {string|string[]} requiredRole - Erişim için gerekli rol(ler)
 * @param {string|string[]} requiredPermission - Erişim için gerekli izin(ler)
 * @returns {JSX.Element}
 */
const PrivateRoute = ({ requiredRole = null, requiredPermission = null }) => {
  const { isAuthenticated, currentUser, loading, hasRole, hasPermission } = useAuth();
  const location = useLocation();

  // Sayfa yükleniyorsa loading göster
  if (loading) {
    return (
      <div className="loading-spinner-container">
        <div className="loading-spinner"></div>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  // Kullanıcı giriş yapmamışsa Login sayfasına yönlendir
  // ve mevcut rota bilgisini state olarak gönder (giriş sonrası yönlendirmek için)
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 1. Eğer belirli bir rol gerekiyorsa kontrol et
  if (requiredRole) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!hasRole(roles)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // 2. Eğer belirli izinler gerekiyorsa kontrol et
  if (requiredPermission) {
    const permissions = Array.isArray(requiredPermission) 
      ? requiredPermission 
      : [requiredPermission];
    
    // Tüm gerekli izinler kullanıcıda var mı kontrol et
    const hasAllPermissions = permissions.every(permission => 
      hasPermission(permission)
    );
    
    if (!hasAllPermissions) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Kullanıcı giriş yapmışsa ve gerekli rol/izinlere sahipse
  // alt route'ları göster (Outlet)
  return <Outlet />;
};

export default PrivateRoute; 