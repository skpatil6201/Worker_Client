// Authentication utility functions

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

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('userType');
  localStorage.removeItem('userData');
  window.location.href = '/';
};

export const getAuthHeaders = () => {
  const token = getToken();
  return token ? {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  } : {
    'Content-Type': 'application/json'
  };
};

export const redirectToDashboard = (userType: string) => {
  switch (userType) {
    case 'admin':
      window.location.href = '/admin-dashboard';
      break;
    case 'firm':
      window.location.href = '/firm-dashboard';
      break;
    case 'candidate':
      window.location.href = '/candidate-dashboard';
      break;
    default:
      window.location.href = '/';
  }
};