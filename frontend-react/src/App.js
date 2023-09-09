import NavBar from './components/NavBar';
import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import { Routes, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';
import Profile from './pages/Profile';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <div className='pages'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
