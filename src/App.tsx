import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import CreateAccount from './CreateAccount';

function App() {
  return (
    <Router>
    <div className="App">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/create-account' element={<CreateAccount />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </div>
  </Router>
  );
}

export default App;
