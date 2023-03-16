import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import UserManagerProvider from './services/userManager/UserManagerProvider';
import BikeManagerProvider from './services/bikeManager/BikeManagerProvider';
import ReservationManagerProvider from './services/reservationManager/ReservationManagerProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserManagerProvider>
        <BikeManagerProvider>
          <ReservationManagerProvider>
            <App />
          </ReservationManagerProvider>
        </BikeManagerProvider>
      </UserManagerProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
