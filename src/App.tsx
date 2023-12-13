import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import PermanentDrawerLeft from './Components/NavBar';
import Container from '@mui/material/Container/Container';
import { Dashboard } from '@mui/icons-material';

function App() {
  return (
    <Router>
    <div className="App">
    {/* <PermanentDrawerLeft /> */}
    <Container maxWidth="lg">
        <Routes>
        <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
        </Routes>
        </Container>
      </div>
  </Router>
  );
}

export default App;
