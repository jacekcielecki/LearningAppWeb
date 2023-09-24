import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home';
import Login from './Pages/Login';
import CreateAccount from './Pages/CreateAccount';
import Test from './Pages/Test';
import { Snackbar } from '@mui/material';
import { Welcome } from './Pages/Welcome';
import PermanentDrawerLeft from './Components/NavBar';
import Container from '@mui/material/Container/Container';

function App() {
  return (
    <Router>
    <div className="App">
    {/* <PermanentDrawerLeft /> */}
    <Container maxWidth="lg">
        <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path="/welcome" element={<Welcome />}></Route>
          <Route path='/create-account' element={<CreateAccount />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/test' element={<Test />}></Route>
        </Routes>
        </Container>
      </div>
  </Router>
  );
}

export default App;
