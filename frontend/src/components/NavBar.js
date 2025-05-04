import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/NavBar.css';

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'appointment',
      message: 'Yeni randevu talebi - Max (Golden Retriever)',
      time: '5 dakika önce',
      isRead: false
    },
    {
      id: 2,
      type: 'emergency',
      message: 'Acil vaka bildirimi - Luna (Kedi)',
      time: '15 dakika önce',
      isRead: false
    },
    {
      id: 3,
      type: 'lab',
      message: 'Laboratuvar sonuçları hazır - Pamuk',
      time: '1 saat önce',
      isRead: true
    }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'appointment':
        return '📅';
      case 'emergency':
        return '🚨';
      case 'lab':
        return '🔬';
      default:
        return '📌';
    }
  };

  useEffect(() => {
    setIsDropdownOpen(false);
    setShowNotifications(false);
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          DOSTLAR VETERİNER KLİNİĞİ
        </Link>

        {currentUser && (
          <>
            <div className="nav-menu">
              <Link to="/dashboard" className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                <i className="fas fa-home"></i>
                Ana Sayfa
              </Link>
              <Link to="/search" className={`nav-item ${location.pathname === '/search' ? 'active' : ''}`}>
                <i className="fas fa-search"></i>
                Gelişmiş Arama
              </Link>

              {/* Çiftlik Hayvanları Sayfası Bağlantısı */}
              <Link to="/farm-animals" className={`nav-item ${location.pathname.includes('/farm-animals') ? 'active' : ''}`}>
                <i className="fas fa-horse"></i>
                Çiftlik Hayvanları
              </Link>

              {/* Formlar Sayfası Bağlantısı */}
              <Link to="/forms" className={`nav-item ${location.pathname.includes('/forms') ? 'active' : ''}`}>
                <i className="fas fa-file-alt"></i>
                Formlar
              </Link>

              <Link to="/vaccines" className={`nav-item ${location.pathname === '/vaccines' ? 'active' : ''}`}>
                <i className="fas fa-syringe"></i>
                Aşı Yönetimi
              </Link>

              <Link to="/medications" className={`nav-item ${location.pathname === '/medications' ? 'active' : ''}`}>
                <i className="fas fa-pills"></i>
                İlaç Yönetimi
              </Link>
            </div>

            <div className="nav-actions">
              {/* Bildirimler Butonu */}
              <div className="notifications-container">
                <button className="notifications-btn" onClick={toggleNotifications}>
                  <i className="fas fa-bell"></i>
                  {unreadNotificationsCount > 0 && (
                    <span className="notification-badge">{unreadNotificationsCount}</span>
                  )}
                </button>

                {showNotifications && (
                  <div className="notifications-dropdown">
                    <div className="notifications-header">
                      <h3>Bildirimler</h3>
                      <button className="mark-all-read">Tümünü Okundu İşaretle</button>
                    </div>
                    <div className="notifications-list">
                      {notifications.length > 0 ? (
                        notifications.map(notification => (
                          <div
                            key={notification.id}
                            className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <span className="notification-icon">
                              {getNotificationIcon(notification.type)}
                            </span>
                            <div className="notification-content">
                              <p className="notification-message">{notification.message}</p>
                              <span className="notification-time">{notification.time}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="no-notifications">
                          <p>Bildirim bulunmamaktadır</p>
                        </div>
                      )}
                    </div>
                    <div className="notifications-footer">
                      <Link to="/notifications">Tüm Bildirimleri Görüntüle</Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Kullanıcı Menüsü */}
              <div className="user-menu-container">
                <button className="user-menu-btn" onClick={toggleDropdown}>
                  <div className="user-avatar">
                    {currentUser.username ? currentUser.username.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="user-name">
                    {currentUser.username}
                  </span>
                  <i className={`fas fa-chevron-down ${isDropdownOpen ? 'rotate' : ''}`}></i>
                </button>

                {isDropdownOpen && (
                  <div className="user-dropdown">
                    <div className="user-dropdown-header">
                      <div className="user-info">
                        <h4>{currentUser.username}</h4>
                        <p>{currentUser.role}</p>
                      </div>
                    </div>
                    <div className="user-dropdown-content">
                      <Link to="/profile" className="dropdown-item">
                        <i className="fas fa-user"></i>
                        Profilim
                      </Link>
                      <Link to="/settings" className="dropdown-item">
                        <i className="fas fa-cog"></i>
                        Ayarlar
                      </Link>
                      <Link to="/help" className="dropdown-item">
                        <i className="fas fa-question-circle"></i>
                        Yardım
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button onClick={handleLogout} className="dropdown-item logout">
                        <i className="fas fa-sign-out-alt"></i>
                        Çıkış Yap
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;