import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_BASE_URL = '/api';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const value = {
    currentUser,
    loading,
    login,
    logout,
    isAuthenticated
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