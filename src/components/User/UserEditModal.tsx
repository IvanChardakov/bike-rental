import { useState, useContext } from 'react';
import Modal from 'react-modal';
import UserManagerContext from '../../services/userManager/UserManagerContext';
import { IUser } from '../../types/user';

import Button from '../common/Button';
import UserForm from './UserForm';

function UserEditModal({ user }: { user: IUser }) {
  const { updateUser } = useContext(UserManagerContext);
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onSubmit = (data: Omit<IUser, 'id'>) => {
    updateUser({ ...data, id: user.id });
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
        <UserForm
          onSubmit={onSubmit}
          formTitle="Edit user"
          submitText="Save"
          initialValues={{ ...user }}
        />
      </Modal>
    </>
  );
}

export default UserEditModal;
