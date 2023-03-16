import { useContext } from 'react';
import ReservationTable from '../components/Reservation/ReservationTable';

import UserManagerContext from '../services/userManager/UserManagerContext';

function UserReservations() {
  const { currentUser } = useContext(UserManagerContext);

  return <ReservationTable user={currentUser} />;
}

export default UserReservations;
