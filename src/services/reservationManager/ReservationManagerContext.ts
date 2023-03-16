import { createContext } from 'react';
import { ReservationManagerType } from '../../types/reservations';

const ReservationManagerContext = createContext<ReservationManagerType>({
  reservations: [],
  createReservation: () => {},
  updateReservation: () => {},
  deleteReservation: () => {},
  getReservationById: () => undefined,
  getReservationByUserId: () => undefined,
  getReservationByBikeId: () => undefined,
});

export default ReservationManagerContext;
