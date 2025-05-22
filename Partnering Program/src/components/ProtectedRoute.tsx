import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      try {
        // Check if we have both token and user
        if (!auth.token || !auth.user) {
          setIsValid(false);
          return;
        }

        // Verify token validity here by making an API call to your backend
        // This should be a lightweight endpoint that just verifies the token
        const response = await fetch('/api/verify-token', {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });

        setIsValid(response.ok);
      } catch (error) {
        setIsValid(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [auth.token, auth.user]);

  // Show loading state while validating
  if (isValidating) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>;
  }

  // Redirect to login if not valid
  if (!isValid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;