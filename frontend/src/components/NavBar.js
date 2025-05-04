import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/NavBar.css';

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // localStorage'dan bildirimleri yükle veya varsayılan bildirimleri kullan
  const [notifications, setNotifications] = useState(() => {
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      return JSON.parse(storedNotifications);
    } else {
      const defaultNotifications = [
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
      ];
      localStorage.setItem('notifications', JSON.stringify(defaultNotifications));
      return defaultNotifications;
    }
  });

  const [showNotifications, setShowNotifications] = useState(false);

  // localStorage'a bildirim değişikliklerini kaydet
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // DirectSalesPage'den gelen yeni bildirim olaylarını dinle
  useEffect(() => {
    const handleNewNotification = (e) => {
      setNotifications(prevNotifications => {
        const updatedNotifications = [e.detail, ...prevNotifications];
        localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
        return updatedNotifications;
      });
    };

    window.addEventListener('newNotification', handleNewNotification);

    return () => {
      window.removeEventListener('newNotification', handleNewNotification);
    };
  }, []);

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
    setNotifications(prevNotifications => {
      const updatedNotifications = prevNotifications.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      );
      localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
      return updatedNotifications;
    });
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
      case 'stock':
        return '📦';
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
        <Link to="/dashboard" className="navbar-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="logo-container" style={{ 
            position: 'relative',
            width: '45px',
            height: '45px',
          }}>
            <div className="logo-background" style={{ 
              background: 'linear-gradient(135deg, #36D1DC 0%, #5B86E5 100%)',
              width: '100%',
              height: '100%',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
              border: '2px solid rgba(255,255,255,0.3)',
              transform: 'rotate(45deg)'
            }}></div>
            <div style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}>
              <span style={{ 
                fontFamily: '"Segoe UI", Arial, sans-serif',
                fontWeight: 'bold',
                fontSize: '22px',
                color: 'white',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                marginTop: '-4px'
              }}>V</span>
              <i className="fas fa-paw" style={{ 
                fontSize: '14px', 
                marginTop: '-7px',
                color: 'white', 
                opacity: 0.9 
              }}></i>
            </div>
          </div>
          VETVERSE VETERİNER KLİNİĞİ
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
                      <button
                        className="mark-all-read"
                        onClick={() => {
                          const updatedNotifications = notifications.map(n => ({ ...n, isRead: true }));
                          setNotifications(updatedNotifications);
                          localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
                        }}
                      >
                        Tümünü Okundu İşaretle
                      </button>
                    </div>
                    <div className="notifications-list">
                      {notifications.length > 0 ? (
                        notifications.map(notification => (
                          <div
                            key={notification.id}
                            className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <div className="notification-icon">
                              {notification.type === 'appointment' && <i className="fas fa-calendar"></i>}
                              {notification.type === 'emergency' && <i className="fas fa-exclamation-triangle"></i>}
                              {notification.type === 'lab' && <i className="fas fa-flask"></i>}
                              {notification.type === 'stock' && <i className="fas fa-box" style={{ color: '#e74c3c' }}></i>}
                              {!['appointment', 'emergency', 'lab', 'stock'].includes(notification.type) && <i className="fas fa-bell"></i>}
                            </div>
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