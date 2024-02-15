import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import { Home } from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import { Dashboard } from './Pages/Dashboard/Dashboard';
import { useState } from 'react';
import AuthGuard from './Components/Guards/AuthGuard';
import UserContext from './Contexts/UserContext';
import { UserDto } from './Models/User/UserDto';
import { ThemeContext } from '@emotion/react';
import LearningAppTheme from './theme';
import { CookiesProvider } from 'react-cookie';
import NotFound from './Pages/NotFound/NotFound';
import Error from './Pages/Error/Error';

function App() {
  const [user, setUser] = useState<UserDto | null>(null);

  return (
    <CookiesProvider>
      <ThemeContext.Provider value={LearningAppTheme}>
        <UserContext.Provider value={{ user, setUser }}>
          <Router>
            <Layout>
              <AuthGuard>
                <Routes>
                  <Route path='/' element={<Home />}/>
                  <Route path='/login' element={<Login />}/>
                  <Route path='/register' element={<Login />}/>
                  <Route path='/dashboard' element={<Dashboard />}/>
                  <Route path='/error' element={<Error />}/>
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </AuthGuard>
            </Layout>
          </Router>
        </UserContext.Provider>
      </ThemeContext.Provider>
    </CookiesProvider>
  );
}

export default App;
