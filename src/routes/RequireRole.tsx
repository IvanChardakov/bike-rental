import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { CURRENT_USER_KEY } from '../utils/constants';

function RequireRole({ children, role }: { children: JSX.Element; role: string }) {
  const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || '');

  let location = useLocation();

  if (currentUser?.role !== role) {
    return <Navigate to={`/${currentUser?.role}-dashboard`} state={{ from: location }} replace />;
  }

  return children;
}

export default RequireRole;
