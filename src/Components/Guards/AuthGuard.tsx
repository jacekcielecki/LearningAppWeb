import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authRoutes } from '../../routes';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(authRoutes.includes(location.pathname)){
      /* Block not logged in users from accessing components that require authentication */
      const token = localStorage.getItem("token");
      if (token === null || token === "") {
        navigate('/login');
      }
    }
  }, [location.pathname, navigate]);

  return <>{children}</>;
};

export default AuthGuard;
