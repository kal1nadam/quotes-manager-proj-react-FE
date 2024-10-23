// context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { loginUser, registerUser } from '../api/api';
import { jwtDecode } from 'jwt-decode';
import { Token, UserTokensModel } from '../api/DTOs';
import axios from 'axios';

// Define the shape of the context
interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, confirmPassword: string) => Promise<void>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for easy access to the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('isAdmin'));

  const login = async (email: string, password: string) => {
    try {
      const response = await loginUser({ email, password });
      const data: UserTokensModel = response.data;

      // Save tokens in localStorage
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      // Decode token to extract userId
      const decodedToken: Token = jwtDecode(data.accessToken);
      localStorage.setItem('userId', decodedToken.sub);

      // Set isAdmin based on isAdmin claim value
      localStorage.setItem('isAdmin', decodedToken.isAdmin);
      if(decodedToken.isAdmin === 'true'){
        setIsAdmin(true);
      }
      else{
        setIsAdmin(false)
      }

      // Set the accessToken as a default header for all axios requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;

      // Set the login state to true
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const register = async (email: string, password: string, confirmPassword: string) => {
    try {
      const response = await registerUser({ email, password, confirmPassword });
      const data: UserTokensModel = response.data;

      // Save tokens in localStorage
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      // Decode token to extract userId
      const decodedToken: Token = jwtDecode(data.accessToken);
      localStorage.setItem('userId', decodedToken.sub);

      // Set isAdmin based on isAdmin claim value
      localStorage.setItem('isAdmin', decodedToken.isAdmin);
      if(decodedToken.isAdmin === 'true'){
        setIsAdmin(true);
      }else{
        setIsAdmin(false)
      }

      // Set the accessToken as a default header for all axios requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;

      // Set the login state to true
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
    window.location.href = '/';
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
