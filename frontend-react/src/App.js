import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import RegisterPopUp from './components/RegisterPopUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPopUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
