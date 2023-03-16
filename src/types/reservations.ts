export interface IReservation {
  id: number;
  userId: number | undefined;
  bikeId: number | undefined;
  fromDate: Date;
  toDate: Date;
}

export type ReservationManagerType = {
  reservations: IReservation[];
  createReservation: (reservation: Omit<IReservation, 'id'>) => void;
  updateReservation: (reservation: IReservation) => void;
  deleteReservation: (id: number) => void;
  getReservationById: (id: number) => IReservation | undefined;
  getReservationByUserId: (id: number) => IReservation[] | undefined;
  getReservationByBikeId: (id: number) => IReservation[] | undefined;
};
