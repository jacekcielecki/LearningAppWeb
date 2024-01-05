import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import { Home } from './Pages/Home/Home';
import { Login } from './Pages/Login/Login';
import { Dashboard } from './Pages/Dashboard/Dashboard';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { getUser } from './Services/UserService';

function App() {
  const [user, setUser] = useState<number | null>(null);

  const navigateToLandingPage = () => { 
    // const location = useLocation();
    // const currentPath = location.pathname;
    // if(currentPath !== '/'){
    //   const navigate = useNavigate(); 
    //   navigate('/');
    // }
  }

  const setState = async () => {
    const token = localStorage.getItem('token');
    if(token == null || token == ''){
      navigateToLandingPage();
    }
    else {
      const decodedToken = jwtDecode(token);
      if(decodedToken.jti == null){
        navigateToLandingPage();
      }
      else {
        const userId : number = parseInt(decodedToken.jti);
        console.log(`User id: ${userId}`)

        const user = await getUser(userId);
        setUser(userId);
        console.log(user);
      }
    }
  }

  useEffect(() => {
    setState();
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/dashboard' element={<Dashboard />}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
