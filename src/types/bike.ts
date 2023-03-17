import { IReservation } from './reservations';

interface UserRating {
  userId: number;
  rating: number;
}

export interface IBike {
  id: number;
  model: string;
  color: string;
  location: string;
  rating: number;
  userRatings?: UserRating[];
  isAvailable: boolean;
}

export interface BikeWithDates extends IBike {
  fromDate?: Date;
  toDate?: Date;
}

export interface BikeFilterOptions {
  model?: string;
  color?: string;
  location?: string;
  minRating?: number;
  fromDate?: Date;
  toDate?: Date;
}

export type BikeManagerType = {
  bikes: IBike[];
  createBike: (bike: Omit<IBike, 'id' | 'userRatings'>) => void;
  updateBike: (bike: Omit<IBike, 'userRatings'>) => void;
  deleteBike: (id: number) => void;
  getBikeById: (id: number) => IBike | undefined;
  getAvailableBikes: () => IBike[];
  filterBikes: (filterOptions: BikeFilterOptions) => IBike[];
  isBikeAvailable: (
    fromDate: Date | undefined,
    toDate: Date | undefined,
    reservations: IReservation[]
  ) => boolean;
  addUserRating: (bikeId: number, userId: number, rating: number) => void;
};
