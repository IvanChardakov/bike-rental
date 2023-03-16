import { Navigate, useLocation } from 'react-router-dom';
import { CURRENT_USER_KEY } from '../utils/constants';

function RequireAuth({ children }: { children: JSX.Element }) {
  const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || 'null');
  let location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
