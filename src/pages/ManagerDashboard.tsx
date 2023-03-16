import React, { useContext } from 'react';
import BikeCreateModal from '../components/Bike/BikeCreateModal';
import BikeTable from '../components/Bike/BikeTable';
import BikeManagerContext from '../services/bikeManager/BikeManagerContext';

function ManagerDashboard() {
  const { bikes } = useContext(BikeManagerContext);

  return (
    <>
      <div className="flex justify-between items-center">
        <h2>
          <b>Bike list</b>
        </h2>
        <BikeCreateModal />
      </div>

      <BikeTable bikes={bikes} />
    </>
  );
}

export default ManagerDashboard;
