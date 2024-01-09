import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authRoutes } from '../../routes';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  let navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(authRoutes.includes(location.pathname)){
      {/* Routes or components that require authentication */}
      const token = localStorage.getItem("token");
      if (token == null || token == "") {
        navigate('/login');
      }
    }
  }, []);

  return <>{children}</>;
};

export default AuthGuard;
