import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_BASE_URL = '/api';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Bildirimler için state ekliyoruz
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

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const userInfo = JSON.parse(localStorage.getItem('userInfo'));
          if (userInfo) {
            setCurrentUser(userInfo);
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/auth/signin', credentials);
      const { token, id, username, email } = response.data;

      const user = {
        id,
        username,
        email
      };

      localStorage.setItem('authToken', token);
      localStorage.setItem('userInfo', JSON.stringify(user));

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setCurrentUser(user);

      return { success: true };
    } catch (error) {
      console.error('Login error:', error.response?.data || error);
      return {
        success: false,
        error: error.response?.data?.message || 'Giriş başarısız oldu'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    delete axios.defaults.headers.common['Authorization'];
    setCurrentUser(null);
  };

  const isAuthenticated = () => {
    return !!currentUser && !!localStorage.getItem('authToken');
  };

  // Yeni bildirim ekleme fonksiyonu
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      time: 'Şimdi',
      isRead: false,
      ...notification
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  // Bildirimi okundu olarak işaretleme
  const markNotificationAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, isRead: true } : notif)
    );
  };

  // Tüm bildirimleri okundu olarak işaretleme
  const markAllNotificationsAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    isAuthenticated,
    notifications,
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 