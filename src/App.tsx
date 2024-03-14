import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import Login from './pages/Login/Login';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { useState } from 'react';
import UserContext from './contexts/UserContext';
import { UserDto } from './interfaces/User/UserDto';
import { ThemeContext } from '@emotion/react';
import LearningAppTheme from './theme';
import { CookiesProvider } from 'react-cookie';
import NotFound from './pages/NotFound/NotFound';
import Error from './pages/Error/Error';
import AuthGuard from './components/Guards/AuthGuard';
import Layout from './components/Layout/Layout';
import Register from './pages/Register/Register';
import Quiz from './pages/Quiz/Quiz';

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
                  <Route path='/register' element={<Register />}/>
                  <Route path='/dashboard' element={<Dashboard />}/>
                  <Route path='/quiz/category/:categoryId?/level/:level?' element={<Quiz />}/>
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
