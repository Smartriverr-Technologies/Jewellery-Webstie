import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api/axiosConfig';
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [wishlist, setWishlist] = useState([]); 
  const [loading, setLoading] = useState(true); // To check initial auth status

  const fetchWishlist = async (token) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await api.get('/api/users/wishlist', config);
      setWishlist(data);
    } catch (error) {
      console.error("Failed to fetch wishlist");
    }
  };
  // useEffect(() => {
  //   // Check for user info in localStorage on initial load
  //   const storedUserInfo = localStorage.getItem('userInfo');
  //   if (storedUserInfo) {
  //     setUserInfo(JSON.parse(storedUserInfo));
  //      fetchWishlist(user.token);
  //   }
  //   setLoading(false);
  // }, []);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      // This is the crucial part: we define the 'user' variable here
      const user = JSON.parse(storedUserInfo);
      
      // Then we use that 'user' variable for both setting state and fetching the wishlist
      setUserInfo(user);
      fetchWishlist(user.token);
    }
    // Set loading to false regardless of whether a user was found
    setLoading(false);
  }, []);

  const register = async (name, email, password) => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await api.post(
      '/api/users/register',
      { name, email, password },
      config
    );
    setUserInfo(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    setWishlist([]);
  };

  const login = async (email, password) => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await api.post(
      '/api/users/login',
      { email, password },
      config
    );
    setUserInfo(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    fetchWishlist(data.token); 
  };

  const logout = () => {
    setUserInfo(null);
      setWishlist([]); 
    localStorage.removeItem('userInfo');
  };

  const addToWishlistCtx = async (productId) => {
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    const { data } = await api.post('/api/users/wishlist', { productId }, config);
    setWishlist(data); // Update state with the returned list
  };

  const removeFromWishlistCtx = async (productId) => {
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    const { data } = await api.delete(`/api/users/wishlist/${productId}`, config);
    setWishlist(data); // Update state
  };
   

  const value = {
    userInfo,
    loading,
    register,
    wishlist,
    login,
    logout,
    addToWishlistCtx,     
    removeFromWishlistCtx, 
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};