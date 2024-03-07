import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authRoutes } from '../../routes';
import { jwtDecode } from 'jwt-decode';
import UserService from '../../services/UserService';
import UserContext from '../../contexts/UserContext';
import Loading from '../Loading/Loading';
import validToken from '../../services/token';

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
    if(!validToken){
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
