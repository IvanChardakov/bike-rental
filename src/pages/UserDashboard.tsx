import React, { useContext, useState, useCallback } from 'react';
import BikesList from '../components/Bike/BikesList';
import BikeFilters from '../components/Bike/BikeFilters';

import BikeManagerContext from '../services/bikeManager/BikeManagerContext';
import { BikeFilterOptions, IBike } from '../types/bike';

function UserDashboard() {
  const { filterBikes, bikes } = useContext(BikeManagerContext);

  const [filteredBikes, setFilteredBikes] = useState<IBike[]>(bikes);

  const onFilterBikes = useCallback(
    (filterOptions: BikeFilterOptions) => {
      const filters: BikeFilterOptions = filterOptions;

      Object.keys(filters).forEach((key) => {
        if (filters[key as keyof BikeFilterOptions] === '-- select an option --') {
          filters[key as keyof BikeFilterOptions] = undefined;
        }
      });

      const bikesAfterFilter = filterBikes(filters);
      setFilteredBikes(bikesAfterFilter);
    },
    [filterBikes]
  );

  return (
    <div className="p-8">
      <BikeFilters onSubmit={onFilterBikes} />
      <BikesList bikes={filteredBikes} />
    </div>
  );
}

export default UserDashboard;
