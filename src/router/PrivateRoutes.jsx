import { Navigate } from 'react-router-dom';
import { getCookie } from '../utils/cookie';

function PrivateRoute({ children }) {
  const token = getCookie('token');  
  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
