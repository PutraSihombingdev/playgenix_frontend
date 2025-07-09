import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);

  // Decode JWT token untuk mendapatkan informasi user
  const decodeToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        user_id: payload.user_id,
        email: payload.email,
        role: payload.role || 'user'
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  useEffect(() => {
    if (token) {
      const userInfo = decodeToken(token);
      setUser(userInfo);
    } else {
      setUser(null);
    }
  }, [token]);

  const login = (jwt) => {
    setToken(jwt);
    localStorage.setItem('token', jwt);
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
