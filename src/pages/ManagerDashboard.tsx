import React, { useContext } from 'react';
import BikesList from '../components/Bike/BikesList';
import BikeTable from '../components/Bike/BikeTable';
import BikeManagerContext from '../services/bikeManager/BikeManagerContext';

function ManagerDashboard() {
  const { bikes } = useContext(BikeManagerContext);

  return (
    <>
      <BikesList bikes={bikes} />
      <BikeTable bikes={bikes} />
    </>
  );
}

export default ManagerDashboard;
