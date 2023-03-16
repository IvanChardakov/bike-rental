import { useContext, useMemo, useCallback } from 'react';
import styled from 'styled-components';

import TData from '../Table/TData';
import Button from '../common/Button';
import { IUser, UserWithDates } from '../../types/user';
import UserEditModal from './UserEditModal';
import UserManagerContext from '../../services/userManager/UserManagerContext';
import { Link } from 'react-router-dom';

const DeleteButton = styled(Button)`
  background-color: rgb(185 28 28);
  :hover {
    background-color: rgb(127 29 29);
  }
`;

function User({ user }: { user: UserWithDates }) {
  const { deleteUser, currentUser } = useContext(UserManagerContext);

  const showDatePeriod = user?.fromDate && user?.toDate;

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
        <DeleteButton
          type="button"
          onClick={() => onDeleteUser()}
          buttonText="Delete"
          className="ml-2"
        />
        {user.role === 'user' ? (
          <Link to={`/users/${user.id}/bike-reservations`} className="ml-2 text-blue-500">
            Bike reservations
          </Link>
        ) : null}
      </>
    ),
    [onDeleteUser, user]
  );

  return (
    <tr>
      <TData data={user.id} />
      <TData data={user.email} />
      <TData data={'*'.repeat(user.password.length)} />
      {showDatePeriod ? (
        <TData
          data={
            <>
              From: {user.fromDate} / To: {user.toDate}
            </>
          }
        />
      ) : null}

      {showDatePeriod ? null : <TData data={user.role} />}
      {showDatePeriod ? null : <TData data={actionButtons} />}
    </tr>
  );
}

export default User;
