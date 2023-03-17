import { createContext } from 'react';
import { BikeManagerType } from '../../types/bike';

const UserManagerContext = createContext<BikeManagerType>({
  bikes: [],
  createBike: () => {},
  updateBike: () => {},
  deleteBike: () => {},
  getBikeById: () => undefined,
  getAvailableBikes: () => [],
  filterBikes: () => [],
  isBikeAvailable: () => true,
  addUserRating: () => {},
});

export default UserManagerContext;
