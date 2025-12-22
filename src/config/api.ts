// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  
  // API Endpoints
  ENDPOINTS: {
    // Auth endpoints
    ADMIN_LOGIN: '/admins/login',
    FIRM_LOGIN: '/firms/login',
    CANDIDATE_LOGIN: '/candidates/login',
    
    // Registration endpoints
    FIRM_REGISTER: '/firms/register',
    CANDIDATE_REGISTER: '/candidates/register',
    
    // Admin endpoints
    FIRMS: '/firms',
    CANDIDATES: '/candidates',
    FIRM_STATUS: (firmId: string) => `/firms/${firmId}/status`,
    CANDIDATE_STATUS: (candidateId: string) => `/candidates/${candidateId}/status`,
    
    // Job endpoints
    JOBS: '/jobs',
    FIRM_JOBS: '/jobs/firm/current',
    
    // Application endpoints
    APPLICATIONS: '/applications',
    FIRM_APPLICATIONS: '/applications/firm/current',
    CANDIDATE_APPLICATIONS: '/applications/candidate/current',
    APPLY_JOB: (jobId: string) => `/applications/apply/${jobId}`,
    APPLICATION_STATUS: (applicationId: string) => `/applications/${applicationId}/status`,
    DELETE_APPLICATION: (applicationId: string) => `/applications/${applicationId}`,
  }
};

// Helper function to build full API URL
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.API_URL}${endpoint}`;
};

// Helper function to get API headers with auth
export const getApiHeaders = (includeAuth: boolean = true): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  
  if (includeAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};