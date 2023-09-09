import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div>
      <button onClick={handleRegister}> Register </button>
    </div>
  );
};

export default Home;
