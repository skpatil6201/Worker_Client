// Authentication utility functions
import { getApiHeaders } from '../config/api';

export interface UserData {
  _id?: string;
  id?: string;
  username?: string;
  email: string;
  firmName?: string;
  fullName?: string;
  role?: string;
}

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const getUserType = (): string | null => {
  return localStorage.getItem('userType');
};

export const getUserData = (): UserData | null => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

export const isAuthenticated = (): boolean => {
  const token = getToken();
  const userType = getUserType();
  return !!(token && userType);
};

export const logout = (navigate?: (path: string) => void): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('userType');
  localStorage.removeItem('userData');
  
  if (navigate) {
    navigate('/');
  } else {
    window.location.href = '/';
  }
};

export const getAuthHeaders = (): Record<string, string> => {
  return getApiHeaders(true);
};

export const redirectToDashboard = (userType: string, navigate?: (path: string) => void) => {
  const path = userType === 'admin' ? '/admin-dashboard' 
    : userType === 'firm' ? '/firm-dashboard'
    : userType === 'candidate' ? '/candidate-dashboard'
    : '/';
    
  if (navigate) {
    navigate(path);
  } else {
    window.location.href = path;
  }
};