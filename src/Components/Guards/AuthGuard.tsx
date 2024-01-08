import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  let navigate = useNavigate();

  useEffect(() => {
    //Check if token is null or expired
    const token = localStorage.getItem("token");
    if (token == null || token == "") {
      // Navigate the user to the "/" page
      navigate('/');
    }
  }, []);

  return <>{children}</>;
};

export default AuthGuard;
