import React, { createContext, useState, useEffect } from "react";
import axios from "axios";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on app load
  useEffect(() => {
    const token = localStorage.getItem("access");
    setIsLoggedIn(!!token); // If a token exists, set isLoggedIn to true
  }, []);

  const login = (access, refresh) => {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem('access_token', access);
    console.log('Token stored:', access);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsLoggedIn(false);
  };
  const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post('http://127.0.0.1:8000/apicall/token/refresh/', {
            refresh: refreshToken,
        });
        localStorage.setItem('access_token', response.data.access); // Update access token
    } catch (error) {
        console.error('Failed to refresh token', error);
    }
};

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
