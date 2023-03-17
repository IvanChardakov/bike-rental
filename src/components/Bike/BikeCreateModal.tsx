import React, { useContext, useState } from 'react';

import Modal from 'react-modal';
import BikeForm from './BikeForm';
import Button from '../common/Button';
import { BikeFormData } from '../../types/formData';
import BikeManagerContext from '../../services/bikeManager/BikeManagerContext';

function BikeCreateModal() {
  const { createBike } = useContext(BikeManagerContext);
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onSubmit = (data: Omit<BikeFormData, 'userRatings' | 'id'>) => {
    createBike(data);
    closeModal();
  };
  return (
    <>
      <Button type="button" onClick={openModal} buttonText="Create bike" />
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="max-w-md mx-auto"
        ariaHideApp={false}
      >
        <BikeForm onSubmit={onSubmit} submitText="Create" />
      </Modal>
    </>
  );
}

export default BikeCreateModal;
