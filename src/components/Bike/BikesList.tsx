import React from 'react';

import Bike from './Bike';
import { IBike } from '../../types/bike';

interface BikeListProps {
  bikes: IBike[];
}

function BikesList({ bikes }: BikeListProps) {
  return (
    <div>
      <div className="flex flex-wrap">
        {bikes.length > 0 ? (
          bikes.map((b) => (
            <Bike
              key={b.id}
              id={b.id}
              model={b.model}
              color={b.color}
              location={b.location}
              rating={b.rating}
              isAvailable={b.isAvailable}
            />
          ))
        ) : (
          <p>There are no bikes</p>
        )}
      </div>
    </div>
  );
}

export default BikesList;
