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
}

export type BikeManagerType = {
  bikes: IBike[];
  createBike: (bike: Omit<IBike, 'id'>) => void;
  updateBike: (bike: IBike) => void;
  deleteBike: (id: number) => void;
  getBikeById: (id: number) => IBike | undefined;
  getAvailableBikes: () => IBike[];
  filterBikes: (filterOptions: BikeFilterOptions) => IBike[];
};
