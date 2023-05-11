import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home';
import Login from './Pages/Login';
import CreateAccount from './Pages/CreateAccount';
import Test from './Test';
import { Snackbar } from '@mui/material';
import { Welcome } from './Pages/Welcome';

function App() {
  return (
    <Router>
    <div className="App">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/welcome' element={<Welcome />}></Route>
          <Route path='/create-account' element={<CreateAccount />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/test' element={<Test />}></Route>
          <Route path='/snackbar' element={<Snackbar />}></Route>
        </Routes>
      </div>
  </Router>
  );
}

export default App;
