import React, { useContext, useState } from 'react';
import Modal from 'react-modal';

import Bike from './Bike';
import BikeForm from './BikeForm';
import { IBike } from '../../types/bike';
import { BikeFormData } from '../../types/formData';
import BikeManagerContext from '../../services/bikeManager/BikeManagerContext';

interface BikeListProps {
  bikes: IBike[];
}

function BikesList({ bikes }: BikeListProps) {
  const { createBike } = useContext(BikeManagerContext);
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onSubmit = (data: BikeFormData) => {
    createBike(data);
    closeModal();
  };

  return (
    <div>
      <button type="button" onClick={openModal}>
        Create bike
      </button>
      <Modal isOpen={isOpen} onRequestClose={closeModal} className="max-w-md mx-auto">
        <BikeForm onSubmit={onSubmit} />
      </Modal>
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
