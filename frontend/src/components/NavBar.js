import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/NavBar.css';

const NavBar = () => {
  const { currentUser, userPermissions, logout, hasRole, hasPermission } = useAuth();
  const navigate = useNavigate();
  const [showPermissions, setShowPermissions] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          Hayvan Sağlık Sistemi
        </Link>
        
        {currentUser && (
          <div className="nav-menu">
            <Link to="/dashboard" className="nav-item">
              Ana Sayfa
            </Link>
            
            {/* Veterinerler için özel menü */}
            {hasRole('vet') && hasPermission('animal:view') && (
              <>
                <Link to="/vet-dashboard" className="nav-item">
                  Veteriner Paneli
                </Link>
                <Link to="/animals" className="nav-item">
                  Hayvan Kayıtları
                </Link>
                {hasPermission('treatment:create') && (
                  <Link to="/treatments" className="nav-item">
                    Tedaviler
                  </Link>
                )}
              </>
            )}
            
            {/* Teknisyenler için özel menü */}
            {hasRole('technician') && (
              <Link to="/animal-records" className="nav-item">
                Kayıt Görüntüleme
              </Link>
            )}
            
            {/* Admin için özel menü */}
            {hasRole('admin') && (
              <>
                <Link to="/admin" className="nav-item">
                  Admin Panel
                </Link>
                {hasPermission('users:view') && (
                  <Link to="/users" className="nav-item">
                    Kullanıcı Yönetimi
                  </Link>
                )}
              </>
            )}
            
            <div className="nav-user">
              <div className="user-info">
                <span className="user-name">
                  Hoş geldiniz, {currentUser.name}
                </span>
                <span className="user-role">
                  Rol: {currentUser.role}
                  <button 
                    className="permissions-toggle"
                    onClick={() => setShowPermissions(!showPermissions)}
                    title="İzinleri göster/gizle"
                  >
                    {showPermissions ? '▲' : '▼'}
                  </button>
                </span>
                
                {/* İzinleri görüntüle */}
                {showPermissions && userPermissions.length > 0 && (
                  <div className="permissions-dropdown">
                    <div className="permissions-header">İzinleriniz:</div>
                    <ul className="permissions-list">
                      {userPermissions.map((permission, index) => (
                        <li key={index}>{permission}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <button onClick={handleLogout} className="logout-btn">
                Çıkış Yap
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;