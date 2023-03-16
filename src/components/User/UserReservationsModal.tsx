import { useState } from 'react';
import Modal from 'react-modal';
import { IUser } from '../../types/user';

import Button from '../common/Button';
import ReservationTable from '../Reservation/ReservationTable';

function UserReservationsModal({ user }: { user: IUser }) {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Button type="button" onClick={openModal} buttonText="Reservations" />
      <Modal isOpen={isOpen} onRequestClose={closeModal} className="max-w-md mx-auto">
        <ReservationTable user={user} />
      </Modal>
    </>
  );
}

export default UserReservationsModal;
