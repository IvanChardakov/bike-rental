import { useEffect, useState } from 'react';
import { IReservation, ReservationManagerType } from '../../types/reservations';
import { LOCAL_STORAGE_RESERVATIONS_KEY } from '../../utils/constants';
import ReservationManagerContext from './ReservationManagerContext';

const ReservationManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [reservations, setReservations] = useState<IReservation[]>([]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_RESERVATIONS_KEY, JSON.stringify(reservations));
  }, [reservations]);

  const createReservation = (reservation: Omit<IReservation, 'id'>) => {
    const newId = reservations?.length === 0 ? 0 : Math.max(...reservations.map((r) => r.id)) + 1;
    setReservations((prev) => [...prev, { ...reservation, id: newId || 0 }]);
  };

  const updateReservation = (reservation: IReservation) => {
    setReservations(reservations.map((r) => (r.id === reservation.id ? reservation : r)));
  };

  const deleteReservation = (id: number) => {
    setReservations(reservations.filter((r) => r.id !== id));
  };

  const getReservationById = (id: number) => {
    return reservations.find((r) => r.id === id);
  };

  const getReservationByUserId = (id: number) => {
    return reservations.filter((r) => r.userId === id);
  };

  const getReservationByBikeId = (id: number) => {
    return reservations.filter((r) => r.bikeId === id);
  };

  const contextValue: ReservationManagerType = {
    reservations,
    createReservation,
    updateReservation,
    deleteReservation,
    getReservationById,
    getReservationByUserId,
    getReservationByBikeId,
  };

  return (
    <ReservationManagerContext.Provider value={contextValue}>
      {children}
    </ReservationManagerContext.Provider>
  );
};

export default ReservationManagerProvider;
