import { IBike } from '../types/bike';

export const initialBikes: IBike[] = [
  {
    id: 0,
    model: 'Cross',
    color: 'green',
    location: 'Plovdiv',
    rating: 4.5,
    userRatings: [{ userId: 1, rating: 5 }],
    isAvailable: true,
  },
  {
    id: 1,
    model: 'Leader',
    color: 'black',
    location: 'Sofia',
    rating: 3.2,
    userRatings: [{ userId: 1, rating: 3 }],
    isAvailable: true,
  },
];
