import { BrowserRouter, Routes, Route, Re } from 'react-router-dom';
import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import Profile from './pages/Profile';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';
import CodingPage from './pages/CodingPage';

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
          <Route path='/codeEditor/:sessionId' element={<CodingPage/>}/>
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
