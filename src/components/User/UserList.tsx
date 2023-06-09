import { useMemo } from 'react';

import User from './User';

import Table from '../Table/Table';
import THead from '../Table/THead';
import { IUser, UserWithDates } from '../../types/user';

interface UserListProps {
  users: UserWithDates[];
}

function UserList({ users }: UserListProps) {
  const showDatePeriod = useMemo(() => {
    if (!users || users.length === 0) return false;

    return !!(users[0].fromDate && users[0].toDate);
  }, [users]);

  return (
    <div>
      <div className="bg-white mx-auto p-6 bg-white">
        <Table>
          <thead>
            <tr>
              <THead title="id" />
              {showDatePeriod ? null : <THead title="email" />}
              <THead title="password" />
              {showDatePeriod ? <THead title="Reservation period" /> : null}
              {showDatePeriod ? null : <THead title="role" />}
              {showDatePeriod ? null : <THead title="actions" />}
            </tr>
          </thead>
          <tbody>
            {users.map((user: IUser, i) => (
              <User user={user} key={`${user.id}-${i}`} />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default UserList;
