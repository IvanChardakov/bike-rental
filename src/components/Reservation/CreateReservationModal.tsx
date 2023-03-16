import { useState, useContext } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

import Button from '../common/Button';
import ReservationForm from './ReservationForm';
import { ReservationFormData } from '../../types/formData';
import UserManagerContext from '../../services/userManager/UserManagerContext';
import ReservationManagerContext from '../../services/reservationManager/ReservationManagerContext';

interface CreateReservationProps {
  bikeId: number;
}

const ReserveWrapper = styled.div`
  position: absolute;
  bottom: -20px;
  left: 0;
  right: 0;
  margin: auto;
  width: 90px;
`;

function CreateReservationModal({ bikeId }: CreateReservationProps) {
  const { createReservation, reservations } = useContext(ReservationManagerContext);

  const { currentUser } = useContext(UserManagerContext);

  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onSubmit = (data: ReservationFormData) => {
    createReservation({ ...data, userId: currentUser?.id, bikeId });
    closeModal();
  };

  return (
    <ReserveWrapper>
      <Button type="button" onClick={openModal} buttonText="Reserve" />
      <Modal isOpen={isOpen} onRequestClose={closeModal} className="max-w-md mx-auto">
        <ReservationForm onSubmit={onSubmit} formTitle="New reservation" submitText="Reserve" />
      </Modal>
    </ReserveWrapper>
  );
}

export default CreateReservationModal;
