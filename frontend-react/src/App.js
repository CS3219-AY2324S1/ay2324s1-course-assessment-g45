import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import Profile from './pages/Profile';
import LoginPage from './pages/LoginPage';
import MaintainerPage from './pages/maintainerPage';
import NavBar from './components/NavBar';
import CodingPage from './pages/CodingPage';
import { useUserContext } from './hooks/useUserContext';

function App() {
  const {user} = useUserContext();
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <div className='pages'>
        <Routes>
          <Route path='/' element={user ? <Home/> : <Navigate to= "/login" />}/>
          <Route path='/register' element={!user ? <RegisterPage/> : <Navigate to= "/" />}/>
          <Route path='/login' element={!user ? <LoginPage/> : <Navigate to= "/" />}/>
          <Route path='/profile' element={user ? <Profile/> : <Navigate to= "/login" />}/>
          <Route path='/maintainer' element={user ? <MaintainerPage/> : <Navigate to= "/login" />}/>
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
