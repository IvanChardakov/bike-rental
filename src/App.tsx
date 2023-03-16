import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Login from './pages/Login';
import Users from './pages/Users';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import RequireRole from './routes/RequireRole';
import RequireAuth from './routes/RequireAuth';
import UserDashboard from './pages/UserDashboard';
import Navigations from './components/Navigations';
import { CURRENT_USER_KEY } from './utils/constants';
import ManagerDashboard from './pages/ManagerDashboard';
import UserReservations from './pages/UserReservations';

function App() {
  const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || 'null');

  return (
    <div>
      <Routes>
        <Route path="/">
          <Route
            index
            element={<Navigate to={currentUser ? `/${currentUser?.role}-dashboard` : `/login`} />}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<Navigations />}>
            <Route
              path="/user-dashboard"
              element={
                <RequireAuth>
                  <RequireRole role="user">
                    <UserDashboard />
                  </RequireRole>
                </RequireAuth>
              }
            />
            <Route
              path="/reservations"
              element={
                <RequireAuth>
                  <RequireRole role="user">
                    <UserReservations />
                  </RequireRole>
                </RequireAuth>
              }
            />
            <Route
              path="/manager-dashboard"
              element={
                <RequireAuth>
                  <RequireRole role="manager">
                    <ManagerDashboard />
                  </RequireRole>
                </RequireAuth>
              }
            />
            <Route
              path="/users"
              element={
                <RequireAuth>
                  <RequireRole role="manager">
                    <Users />
                  </RequireRole>
                </RequireAuth>
              }
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
