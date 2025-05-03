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
          DOSTLAR VETERİNER KLİNİĞİ
        </Link>

        {currentUser && (
          <div className="nav-menu">
            <Link to="/dashboard" className="nav-item">
              Ana Sayfa
            </Link>

            {/* Veterinerler için özel menü */}
            {hasRole('vet') && hasPermission('animal:view') && (
              <>
                <Link to="/search" className="nav-item">
                  Gelişmiş Arama
                </Link>
              </>
            )}

            {/* Teknisyenler için özel menü */}
            {hasRole('technician') && (
              <>
                <Link to="/animal-records" className="nav-item">
                  Kayıt Görüntüleme
                </Link>
                <Link to="/search" className="nav-item">
                  Hasta Arama
                </Link>
              </>
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
                  Hoş geldiniz, Dr. {currentUser.name}
                </span>
                <span className="user-role">
                  {currentUser.role}
                </span>
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