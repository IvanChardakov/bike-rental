import React, { useState, useContext } from 'react';
import Modal from 'react-modal';

import User from './User';
import UserForm from './UserForm';

import { IUser } from '../../types/user';
import UserManagerContext from '../../services/userManager/UserManagerContext';
import Table from '../Table/Table';
import THead from '../Table/THead';

function UserList() {
  const { users, createUser } = useContext(UserManagerContext);
  const [isOpen, setIsOpen] = useState(false);

  console.log({ users });

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
    <div>
      <h3>User list</h3>
      <button type="button" onClick={openModal}>
        Create user
      </button>
      <Modal isOpen={isOpen} onRequestClose={closeModal} className="max-w-md mx-auto">
        <UserForm onSubmit={onSubmit} />
      </Modal>

      <Table>
        <thead>
          <THead title="id" />
          <THead title="email" />
          <THead title="password" />
          <THead title="role" />
          <THead title="actions" />
        </thead>
        <tbody>
          {users.map((user: IUser) => (
            <User user={user} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UserList;
