import { Navigate } from 'react-router-dom';
import { getCookie } from '../utils/cookie';

function PublicRoute({ children }) {
  const token = getCookie('token');
  return token ? <Navigate to="/dashboard" /> : children;
}

export default PublicRoute;