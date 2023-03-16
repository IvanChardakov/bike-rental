import React, { useContext, useState, useCallback } from 'react';
import BikesList from '../components/Bike/BikesList';
import BikeFilters from '../components/Bike/BikeFilters';

import BikeManagerContext from '../services/bikeManager/BikeManagerContext';
import { BikeFilterOptions, IBike } from '../types/bike';
import ReservationManagerContext from '../services/reservationManager/ReservationManagerContext';

function UserDashboard() {
  const { bikes, filterBikes, isBikeAvailable } = useContext(BikeManagerContext);
  const { getReservationByBikeId } = useContext(ReservationManagerContext);

  const [filteredBikes, setFilteredBikes] = useState<IBike[]>(bikes);

  const onFilterBikes = useCallback(
    (filterOptions: BikeFilterOptions) => {
      const filters: BikeFilterOptions = filterOptions;

      Object.keys(filters).forEach((key) => {
        if (filters[key as keyof BikeFilterOptions] === '-- select an option --') {
          filters[key as keyof BikeFilterOptions] = undefined;
        }
      });

      let bikesAfterFilter = filterBikes(filters);

      if (filterOptions.fromDate || filterOptions.toDate) {
        const formDate = filterOptions.fromDate && new Date(filterOptions.fromDate);
        const toDate = filterOptions.toDate && new Date(filterOptions.toDate);

        bikesAfterFilter = bikesAfterFilter.map((bike: IBike) => {
          const reservations = getReservationByBikeId(bike.id) || [];
          const isAvailable = isBikeAvailable(formDate, toDate, reservations);
          return { ...bike, isAvailable };
        });
      }

      setFilteredBikes(bikesAfterFilter);
    },
    [filterBikes, getReservationByBikeId, isBikeAvailable]
  );

  return (
    <div className="p-8">
      <BikeFilters onSubmit={onFilterBikes} />
      <BikesList bikes={filteredBikes} />
    </div>
  );
}

export default UserDashboard;
