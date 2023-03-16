import { useState, useEffect } from 'react';
import BikeManagerContext from './BikeManagerContext';
import { IBike, BikeManagerType, BikeFilterOptions } from '../../types/bike';
import { initialBikes } from '../../mockData/initialBikes';
import { LOCAL_STORAGE_BIKES_KEY } from '../../utils/constants';
import { IReservation } from '../../types/reservations';

const BikeManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [bikes, setBikes] = useState<IBike[]>(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_BIKES_KEY) || JSON.stringify(initialBikes))
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_BIKES_KEY, JSON.stringify(bikes));
  }, [bikes]);

  const createBike = (bike: Omit<IBike, 'id'>) => {
    const newId = bikes?.length === 0 ? 0 : Math.max(...bikes.map((b) => b.id)) + 1;
    setBikes((prev) => [...prev, { ...bike, id: newId }]);
  };

  const updateBike = (bike: IBike) => {
    const updatedBikes = bikes.map((b) => (b.id === bike.id ? bike : b));
    setBikes(updatedBikes);
  };

  const deleteBike = (bikeId: number) => {
    const filteredBikes = bikes.filter((b) => b.id !== bikeId);
    setBikes(filteredBikes);
  };

  const getBikeById = (bikeId: number): IBike | undefined => {
    const bike = bikes.find((b) => b.id === bikeId);
    return bike;
  };

  const getAvailableBikes = (): IBike[] => {
    return bikes.filter((b) => b.isAvailable);
  };

  function isBikeAvailable(
    fromDate: Date | undefined,
    toDate: Date | undefined,
    reservations: IReservation[]
  ): boolean {
    if (!reservations || reservations.length === 0) {
      return true;
    }

    if (!fromDate && !toDate) {
      return true;
    }

    if (fromDate && toDate) {
      const rangeAvailable = !reservations.find((reservation) => {
        return new Date(reservation.fromDate) <= toDate && new Date(reservation.toDate) >= fromDate;
      });
      if (!rangeAvailable) {
        return false;
      }
    }

    const selectedDate = fromDate || toDate;

    if (selectedDate) {
      const selectedDateAvailable = !reservations.find((reservation) => {
        return (
          new Date(reservation.fromDate) <= selectedDate &&
          new Date(reservation.toDate) >= selectedDate
        );
      });
      if (!selectedDateAvailable) {
        return false;
      }
    }

    return true;
  }

  const filterBikes = (filterOptions: BikeFilterOptions): IBike[] => {
    let filteredBikes = bikes;

    if (filterOptions.model) {
      filteredBikes = filteredBikes.filter((b) => b.model === filterOptions.model);
    }

    if (filterOptions.color) {
      filteredBikes = filteredBikes.filter((b) => b.color === filterOptions.color);
    }

    if (filterOptions.location) {
      filteredBikes = filteredBikes.filter((b) => b.location === filterOptions.location);
    }

    if (filterOptions.minRating) {
      filteredBikes = filteredBikes.filter(
        (b) => filterOptions.minRating && b.rating >= filterOptions.minRating
      );
    }

    return filteredBikes;
  };

  const contextValue: BikeManagerType = {
    bikes,
    createBike,
    updateBike,
    deleteBike,
    getBikeById,
    getAvailableBikes,
    filterBikes,
    isBikeAvailable,
  };

  return <BikeManagerContext.Provider value={contextValue}>{children}</BikeManagerContext.Provider>;
};

export default BikeManagerProvider;
