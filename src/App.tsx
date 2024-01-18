import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import { Home } from './Pages/Home/Home';
import { Login } from './Pages/Login/Login';
import { Dashboard } from './Pages/Dashboard/Dashboard';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import AuthGuard from './Components/Guards/AuthGuard';
import UserContext from './Contexts/UserContext';
import { UserDto } from './Models/User/UserDto';
import { ThemeContext } from '@emotion/react';
import LearningAppTheme from './theme';
import UserService from './Services/UserService';

function App() {
  const [userContext, setUserContext] = useState<UserDto | null>(null);

  const setContexts = async () => {
    const token = localStorage.getItem('token');
    if(token !== null && token !== ''){
      const decodedToken = jwtDecode(token);
      if(decodedToken.jti != null){
        const user = await UserService.GetById(parseInt(decodedToken.jti));
        setUserContext(user);
      }
    }
  };

  useEffect(() => {
    setContexts();
  }, []);

  return (
    <ThemeContext.Provider value={LearningAppTheme}>
      <UserContext.Provider value={userContext}>
        <Router>
          <Layout>
            <AuthGuard>
              <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/register' element={<Login />}/>
                <Route path='/dashboard' element={<Dashboard />}/>
              </Routes>
            </AuthGuard>
          </Layout>
        </Router>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
