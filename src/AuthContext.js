import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (token, userId) => {
    const decodedUser = decode(token);

    if (decodedUser && userId) {
      setUser({ decodedUser, userId });

      // Store token and user ID securely in session storage
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userId', userId);
    } else {
      console.error('Invalid token or user ID.');
    }
  };

  const logout = () => {
    setUser(null);

    // Remove token and user ID from session storage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
  };

  const isAuthenticated = () => !!sessionStorage.getItem('token') && !!sessionStorage.getItem('userId');

  // Function to retrieve the JWT from session storage
  const getAuthToken = () => {
    return sessionStorage.getItem('token');
  };

  useEffect(() => {
    // You might want to add additional logic here, such as checking the token's expiration
    // and refreshing it if necessary.
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, getAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const jwtDecode = require('jwt-decode');

const decode = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export { AuthProvider, useAuth };
