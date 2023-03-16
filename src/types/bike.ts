import { IReservation } from './reservations';

export interface IBike {
  id: number;
  model: string;
  color: string;
  location: string;
  rating: number;
  isAvailable: boolean;
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
  createBike: (bike: Omit<IBike, 'id'>) => void;
  updateBike: (bike: IBike) => void;
  deleteBike: (id: number) => void;
  getBikeById: (id: number) => IBike | undefined;
  getAvailableBikes: () => IBike[];
  filterBikes: (filterOptions: BikeFilterOptions) => IBike[];
  isBikeAvailable: (
    fromDate: Date | undefined,
    toDate: Date | undefined,
    reservations: IReservation[]
  ) => boolean;
};
