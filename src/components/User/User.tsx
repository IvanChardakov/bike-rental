import { useContext, useMemo, useCallback } from 'react';
import styled from 'styled-components';

import TData from '../Table/TData';
import Button from '../common/Button';
import { IUser } from '../../types/user';
import UserEditModal from './UserEditModal';
import UserReservationsModal from './UserReservationsModal';
import UserManagerContext from '../../services/userManager/UserManagerContext';

const DeleteButton = styled(Button)`
  background-color: rgb(185 28 28);
  :hover {
    background-color: rgb(127 29 29);
  }
`;

function User({ user }: { user: IUser }) {
  const { deleteUser, currentUser } = useContext(UserManagerContext);

  const onDeleteUser = useCallback(() => {
    if (user.id === currentUser?.id) {
      alert("You can't delete yourself");
    } else {
      if (window.confirm('Are you sure you want to delete this user?')) {
        deleteUser(user.id);
      }
    }
  }, [currentUser?.id, deleteUser, user.id]);

  const actionButtons = useMemo(
    () => (
      <>
        <UserEditModal user={user} />
        <span className="ml-2">
          <UserReservationsModal user={user} />
        </span>
        <DeleteButton
          type="button"
          onClick={() => onDeleteUser()}
          buttonText="Delete"
          className="ml-2"
        />
      </>
    ),
    [onDeleteUser, user]
  );

  return (
    <tr>
      <TData data={user.id} />
      <TData data={user.email} />
      <TData data={'*'.repeat(user.password.length)} />
      <TData data={user.role} />
      <TData data={actionButtons} />
    </tr>
  );
}

export default User;
