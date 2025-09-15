import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Create the context
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// 2. Create the provider component
export const CartProvider = ({ children }) => {
  // Load initial state from localStorage or default to an empty array
  const initialState = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  };

  const [cartItems, setCartItems] = useState(initialState);
  const clearCart = () => {
  setCartItems([]);
  localStorage.removeItem('cart');
};

  const [shippingAddress, setShippingAddress] = useState(() => {
    try {
      const savedAddress = localStorage.getItem('shippingAddress');
      return savedAddress ? JSON.parse(savedAddress) : {};
    } catch (error) {
      return {};
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

    const saveShippingAddress = (data) => {
    setShippingAddress(data);
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  };

  const addToCart = (product, qty) => {
    // Check if the product is already in the cart
    const exist = cartItems.find((x) => x._id === product._id);

    if (exist) {
      // If it exists, update the quantity
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty + qty } : x
        )
      );
    } else {
      // If it's a new product, add it to the cart
      setCartItems([...cartItems, { ...product, qty }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((x) => x._id !== productId));
  };

  // The value that will be supplied to all consuming components
  const value = {
    cartItems,
    shippingAddress,
    addToCart,
    removeFromCart,
    saveShippingAddress,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};