import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getUserType } from '../utils/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: string;
}

export default function ProtectedRoute({ children, requiredUserType }: ProtectedRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      console.log('ProtectedRoute - Checking authentication...');
      console.log('Is authenticated:', isAuthenticated());
      console.log('User type:', getUserType());
      console.log('Required user type:', requiredUserType);

      if (!isAuthenticated()) {
        console.log('Not authenticated, redirecting to login');
        navigate('/login');
        return;
      }

      if (requiredUserType) {
        const userType = getUserType();
        if (userType !== requiredUserType) {
          console.log(`Wrong user type. Expected: ${requiredUserType}, Got: ${userType}`);
          // Wrong user type, redirect to appropriate dashboard
          switch (userType) {
            case 'admin':
              navigate('/admin-dashboard');
              break;
            case 'firm':
              navigate('/firm-dashboard');
              break;
            case 'candidate':
              navigate('/candidate-dashboard');
              break;
            default:
              navigate('/login');
          }
          return;
        }
      }

      console.log('Authentication check passed, rendering component');
    };

    checkAuth();
  }, [navigate, requiredUserType]);

  // If not authenticated or wrong user type, don't render children
  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (requiredUserType && getUserType() !== requiredUserType) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}