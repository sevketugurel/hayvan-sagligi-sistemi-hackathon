import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/NavBar.css';

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

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
            <Link to="/search" className="nav-item">
              Gelişmiş Arama
            </Link>
            <Link to="/animal-records" className="nav-item">
              Kayıt Görüntüleme
            </Link>
            <Link to="/admin" className="nav-item">
              Admin Panel
            </Link>
            <Link to="/users" className="nav-item">
              Kullanıcı Yönetimi
            </Link>

            <div className="nav-user">
              <div className="user-info">
                <span className="user-name">
                  Hoş geldiniz, {currentUser.username}
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