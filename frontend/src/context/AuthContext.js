import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

// Kullanıcı rollerine göre izin kontrol işlemleri
const PERMISSIONS = {
  vet: ['dashboard:view', 'animal:view', 'animal:update', 'treatment:create', 'treatment:update', 'prescription:create'],
  admin: ['dashboard:view', 'users:view', 'users:create', 'users:update', 'users:delete', 'animal:view', 'animal:update', 'system:settings'],
  petOwner: ['myPets:view', 'myPets:history'],
  technician: ['dashboard:view', 'animal:view', 'treatment:view'],
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userPermissions, setUserPermissions] = useState([]);

  // LocalStorage'dan user bilgisini kontrol et
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('authToken');
        
        if (token) {
          // Token'ı kullanarak kullanıcı bilgilerini al
          // Not: Bu kısım backend API'ye göre düzenlenmelidir
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          const userInfo = JSON.parse(localStorage.getItem('userInfo'));
          setCurrentUser(userInfo);
          
          // Kullanıcı rolüne göre izinleri ayarla
          if (userInfo && userInfo.role) {
            setUserPermissions(PERMISSIONS[userInfo.role] || []);
          }
        }
      } catch (error) {
        // Token geçersiz veya süresi dolmuşsa localStorage'dan temizle
        localStorage.removeItem('authToken');
        localStorage.removeItem('userInfo');
        axios.defaults.headers.common['Authorization'] = '';
        setUserPermissions([]);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Login fonksiyonu
  const login = async (credentials, type = 'tc') => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signin', credentials);
      
      const { token, id, username, email, roles } = response.data;
      const user = {
        id,
        username,
        email,
        role: roles[0].replace('ROLE_', '').toLowerCase()
      };
      
      // Token'ı ve kullanıcı bilgisini localStorage'a kaydet
      localStorage.setItem('authToken', token);
      localStorage.setItem('userInfo', JSON.stringify(user));
      
      // Axios header'ına token'ı ekle
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Kullanıcı state'ini güncelle
      setCurrentUser(user);
      
      // Kullanıcı role'üne göre izinleri set et
      setUserPermissions(PERMISSIONS[user.role] || []);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Giriş başarısız oldu'
      };
    }
  };

  // Logout fonksiyonu
  const logout = () => {
    // LocalStorage'dan auth bilgilerini temizle
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    
    // Auth header'ını temizle
    axios.defaults.headers.common['Authorization'] = '';
    
    // Kullanıcı state'ini sıfırla
    setCurrentUser(null);
    // İzinleri temizle
    setUserPermissions([]);
  };

  // Kullanıcının oturum durumunu kontrol et
  const isAuthenticated = () => {
    return !!currentUser;
  };

  // Kullanıcının belirli bir izne sahip olup olmadığını kontrol et
  const hasPermission = (permission) => {
    return userPermissions.includes(permission);
  };

  // Kullanıcının belirli bir role sahip olup olmadığını kontrol et
  const hasRole = (roles) => {
    if (!currentUser) return false;
    
    if (Array.isArray(roles)) {
      return roles.includes(currentUser.role);
    }
    
    return currentUser.role === roles;
  };

  const value = {
    currentUser,
    loading,
    userPermissions,
    login,
    logout,
    isAuthenticated,
    hasPermission,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 