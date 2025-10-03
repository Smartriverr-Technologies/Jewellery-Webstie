import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  // --- STATE INITIALIZATION ---
  // Load initial cart items from localStorage or default to an empty array
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  // Load initial shipping address from localStorage or default to an empty object
  const [shippingAddress, setShippingAddress] = useState(() => {
    try {
      const savedAddress = localStorage.getItem('shippingAddress');
      return savedAddress ? JSON.parse(savedAddress) : {};
    } catch (error) {
      return {};
    }
  });

  // Load initial payment method from localStorage or default to 'COD'
  const [paymentMethod, setPaymentMethod] = useState(() => {
    return localStorage.getItem('paymentMethod') || 'COD';
  });

  // --- SIDE EFFECTS ---
  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // --- FUNCTIONS ---
  const saveShippingAddress = (data) => {
    setShippingAddress(data);
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  };
  
  const savePaymentMethod = (method) => {
    setPaymentMethod(method);
    localStorage.setItem('paymentMethod', method);
  };

  const addToCart = (product, qty) => {
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty + qty } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((x) => x._id !== productId));
  };
  
  const clearCart = () => {
    setCartItems([]);
    // Note: We only clear cart items, not address or payment method
    localStorage.removeItem('cart');
  };

  // The value that will be supplied to all consuming components
  const value = {
    cartItems,
    shippingAddress,
    paymentMethod,
    addToCart,
    removeFromCart,
    saveShippingAddress,
    savePaymentMethod,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};