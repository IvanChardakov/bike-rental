import { useCallback, useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import UserManagerContext from '../services/userManager/UserManagerContext';

function Navigation() {
  const { logout, currentUser } = useContext(UserManagerContext);
  const navigate = useNavigate();

  const onLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  return (
    <div>
      <nav className="flex items-center justify-between bg-gray-600 text-white p-4">
        <div className="flex items-center">
          <span className="text-xl font-bold">Bike rental</span>
        </div>
        <ul className="flex items-center">
          <li className="mr-4">
            <Link to={`/${currentUser?.role}-dashboard`} className="hover:text-gray-400">
              Bikes
            </Link>
          </li>
          {currentUser?.role === 'manager' ? (
            <li className="mr-4">
              <Link to="/users" className="hover:text-gray-400">
                Users
              </Link>
            </li>
          ) : null}
          {currentUser?.role === 'user' ? (
            <li className="mr-4">
              <Link to="/reservations" className="hover:text-gray-400">
                Reservations
              </Link>
            </li>
          ) : null}
          <li className="mr-4">
            <button onClick={onLogout} className="hover:text-gray-400">
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Navigation;
