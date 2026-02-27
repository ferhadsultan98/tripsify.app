import React, { createContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStorage = async () => {
      const token = await storage.getToken();
      const user = await storage.getUser();
      if (token) {
        setUserToken(token);
        setUserInfo(user);
      }
      setIsLoading(false);
    };
    loadStorage();
  }, []);

  const login = async (token, user) => {
    await storage.setToken(token);
    await storage.setUser(user);
    setUserToken(token);
    setUserInfo(user);
  };

  const logout = async () => {
    await storage.clearAll();
    setUserToken(null);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
