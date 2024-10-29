import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../utils/cookie';
import logo from "../assets/logo.png";

function HomePage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const username = getCookie('username');
    const token = getCookie('token');
    
  
    const timer = setTimeout(() => {
      if (token) {
        navigate('/dashboard');
      } else if (username) {
        navigate('/login');
      } else {
        navigate('/register');
      }
    }, 1500); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white">
      <div className="text-center">
        <img 
          src={logo} 
          alt="Logo" 
          className="mb-8 animate-bounce"
          style={{ animation: 'bounce 1s infinite' }}
        />
        <div className="mt-4">
          <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;