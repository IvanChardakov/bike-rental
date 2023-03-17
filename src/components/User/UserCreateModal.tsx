import { useContext, useState } from 'react';
import Modal from 'react-modal';

import UserForm from './UserForm';
import { IUser } from '../../types/user';
import UserManagerContext from '../../services/userManager/UserManagerContext';
import Button from '../common/Button';

function UserCreateModal() {
  const { createUser } = useContext(UserManagerContext);
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onSubmit = (data: Omit<IUser, 'id'>) => {
    createUser(data);
    closeModal();
  };
  return (
    <>
      <Button type="button" onClick={openModal} buttonText=" Create user" />
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="max-w-md mx-auto"
        ariaHideApp={false}
      >
        <UserForm onSubmit={onSubmit} submitText="Create" />
      </Modal>
    </>
  );
}

export default UserCreateModal;
