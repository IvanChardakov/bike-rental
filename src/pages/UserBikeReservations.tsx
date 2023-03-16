import React, { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { IBike } from '../types/bike';
import BikeTable from '../components/Bike/BikeTable';
import UserManagerContext from '../services/userManager/UserManagerContext';
import BikeManagerContext from '../services/bikeManager/BikeManagerContext';
import ReservationManagerContext from '../services/reservationManager/ReservationManagerContext';

function UserBikeReservations() {
  const { userId } = useParams();
  const { getUserById } = useContext(UserManagerContext);
  const { getReservationByUserId } = useContext(ReservationManagerContext);
  const { getBikeById } = useContext(BikeManagerContext);

  const user = useMemo(() => {
    return userId ? getUserById(parseInt(userId, 10)) : null;
  }, [getUserById, userId]);

  const userReservations = useMemo(() => {
    if (!user || !userId) {
      return [];
    }

    const reservations = getReservationByUserId(parseInt(userId, 10));
    return reservations;
  }, [getReservationByUserId, user, userId]);

  const bikes = useMemo(() => {
    if (!userReservations) {
      return [];
    }
    const reservationBikes = userReservations.map((res) => {
      if (res.bikeId) {
        const bike: IBike | undefined = getBikeById(res.bikeId);
        return { ...bike, fromDate: res.fromDate, toDate: res.toDate };
      }
    });

    return reservationBikes;
  }, [getBikeById, userReservations]);

  if (!user) {
    return <div>There is no user with this id</div>;
  }

  return (
    <div>
      <h3>Bikes reserved by {user?.email}</h3>
      {/* @ts-ignore  */}
      <BikeTable bikes={bikes} />
    </div>
  );
}

export default UserBikeReservations;
