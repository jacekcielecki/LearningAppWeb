import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authRoutes } from '../../routes';
import { jwtDecode } from 'jwt-decode';
import UserService from '../../services/UserService';
import UserContext from '../../contexts/UserContext';
import Loading from '../Loading/Loading';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);

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
        return !tokenExpired;
      }
      return false;
    }
    return false;
  }

  const refreshUserContext = async () => {
    const token = localStorage.getItem("token");
    if(!!token){
      const decodedToken = jwtDecode(token);
      if (!!decodedToken?.jti){
        UserService.GetById(parseInt(decodedToken.jti)).then((response) => {
          setUser(response.data);
          setLoading(false);
        }).catch(() => {
          navigateToErrorPage();
          setLoading(false);
        });
      }
    }
  }

  const authorize = async () => {
    const token = localStorage.getItem('token');
    const isValidToken = validateJwtToken(token);

    if(!isValidToken){
      navigateToLoginPage();
      return;
    }

    await refreshUserContext();
  }

  useEffect(() => {
    if(authRoutes.includes(location.pathname)){
      setLoading(true);
      /* Block not logged in users from accessing components that require authentication */
      authorize();
    }
  }, [location.pathname, navigate]);

  return (
    <>
      {loading && <Loading />}
      {children}
    </>
  );
};

export default AuthGuard;
