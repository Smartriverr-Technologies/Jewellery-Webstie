import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true); // To check initial auth status

  useEffect(() => {
    // Check for user info in localStorage on initial load
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
    setLoading(false);
  }, []);

  const register = async (name, email, password) => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post(
      'http://localhost:4000/api/users/register',
      { name, email, password },
      config
    );
    setUserInfo(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
  };

  const login = async (email, password) => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post(
      'http://localhost:4000/api/users/login',
      { email, password },
      config
    );
    setUserInfo(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
  };

  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem('userInfo');
  };

  const value = {
    userInfo,
    loading,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};