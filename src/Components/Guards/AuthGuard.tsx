import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authRoutes } from '../../routes';
import { UserDto } from '../../Models/User/UserDto';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import UserService from '../../Services/UserService';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [jwtPayload, setJwtPayload] = useState<JwtPayload | null>(null);
  const [userContext, setUserContext] = useState<UserDto | null>(null);

  const navigateToErrorPage = () => { 
    navigate('/error');
  }

  const navigateToLoginPage = () => { 
    navigate('/login');
  }

  const validateJwtToken = (jwtToken : string | null) => {
    if(!!jwtToken){
      const decodedToken = jwtDecode(jwtToken);
      if(!!decodedToken.jti && !!decodedToken.exp){
        const currentTime = Date.now() / 1000;
        const tokenExpired = decodedToken.exp < currentTime;
        setJwtPayload(decodedToken);
        return !tokenExpired;
      }
      return false;
    }
    return false;
  }

  const refreshUserContext = async () => {
    if (userContext === null && !!jwtPayload?.jti){
      UserService.GetById(parseInt(jwtPayload.jti)).then((response) => {
        setUserContext(response.data);
      }).catch(() => {
        navigateToErrorPage();
      });
    }
  }

  const authorize = async () => {
    const token = localStorage.getItem('token');
    const isValidToken = validateJwtToken(token);
    isValidToken ? await refreshUserContext() : navigateToLoginPage();
  }

  useEffect(() => {
    if(authRoutes.includes(location.pathname)){
      /* Block not logged in users from accessing components that require authentication */
      authorize();
    }
  }, [location.pathname, navigate, userContext]);

  return <>{children}</>;
};

export default AuthGuard;
