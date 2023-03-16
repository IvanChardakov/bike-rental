import React, { useContext, useState } from 'react';

import Modal from 'react-modal';
import BikeForm from './BikeForm';
import { BikeFormData } from '../../types/formData';
import BikeManagerContext from '../../services/bikeManager/BikeManagerContext';
import Button from '../common/Button';

function BikeCreateModal() {
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
    <>
      <Button type="button" onClick={openModal} buttonText="Create bike" />
      <Modal isOpen={isOpen} onRequestClose={closeModal} className="max-w-md mx-auto">
        <BikeForm onSubmit={onSubmit} submitText="Create" />
      </Modal>
    </>
  );
}

export default BikeCreateModal;
