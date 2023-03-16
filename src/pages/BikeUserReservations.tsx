import { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import UserManagerContext from '../services/userManager/UserManagerContext';
import BikeManagerContext from '../services/bikeManager/BikeManagerContext';
import ReservationManagerContext from '../services/reservationManager/ReservationManagerContext';
import { IUser } from '../types/user';
import UserList from '../components/User/UserList';

function BikeUserReservations() {
  const { bikeId } = useParams();
  const { getUserById } = useContext(UserManagerContext);
  const { getReservationByBikeId } = useContext(ReservationManagerContext);
  const { getBikeById } = useContext(BikeManagerContext);

  const bike = useMemo(() => {
    return bikeId ? getBikeById(parseInt(bikeId, 10)) : null;
  }, [bikeId, getBikeById]);

  const bikeResrvations = useMemo(() => {
    if (!bike || !bikeId) {
      return [];
    }

    const reservations = getReservationByBikeId(bike.id);
    return reservations;
  }, [bike, bikeId, getReservationByBikeId]);

  const users = useMemo(() => {
    if (!bikeResrvations) {
      return [];
    }
    const reservationUsers = bikeResrvations.map((res) => {
      if (res.userId) {
        const user: IUser | undefined = getUserById(res.userId);
        return { ...user, fromDate: res.fromDate, toDate: res.toDate };
      }
    });

    return reservationUsers;
  }, [bikeResrvations, getUserById]);

  if (!bike) {
    return <div>There is no bike with this id</div>;
  }

  return (
    <div>
      <h3>
        User reservations for <b>{bike.model}</b> bike
      </h3>
      {/* @ts-ignore  */}
      <UserList users={users} />
    </div>
  );
}

export default BikeUserReservations;
