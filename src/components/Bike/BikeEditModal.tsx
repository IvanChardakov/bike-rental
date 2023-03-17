import { useState, useContext } from 'react';
import Modal from 'react-modal';

import BikeForm from './BikeForm';
import Button from '../common/Button';
import { IBike } from '../../types/bike';
import { BikeFormData } from '../../types/formData';
import BikeManagerContext from '../../services/bikeManager/BikeManagerContext';

interface BikeEditProps {
  bike: IBike;
}

function BikeEditModal({ bike }: BikeEditProps) {
  const { updateBike } = useContext(BikeManagerContext);

  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onSubmit = (data: BikeFormData) => {
    updateBike({ ...data, id: bike.id });
    closeModal();
  };

  return (
    <>
      <Button type="button" onClick={openModal} buttonText="Edit" />
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="max-w-md mx-auto"
        ariaHideApp={false}
      >
        <BikeForm
          onSubmit={onSubmit}
          initialValues={{ ...bike }}
          formTitle="Edit bike"
          submitText="Save"
        />
      </Modal>
    </>
  );
}

export default BikeEditModal;
