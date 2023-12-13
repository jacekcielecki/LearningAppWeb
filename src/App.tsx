import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Header from './Components/Header';
import { Dashboard, Fullscreen } from '@mui/icons-material';
import Box from '@mui/material/Box';

function App() {
  return (
  <Router>
    <Header />
    <Box sx={{ my: 16, mx: 12, display: 'flex', justifyContent: 'center'}}> 
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
      </Routes>
    </Box>
  </Router>
  );
}

export default App;
