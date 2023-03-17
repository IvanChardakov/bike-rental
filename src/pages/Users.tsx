import React, { useContext } from 'react';
import UserList from '../components/User/UserList';
import UserCreateModal from '../components/User/UserCreateModal';
import UserManagerContext from '../services/userManager/UserManagerContext';

function Users() {
  const { users } = useContext(UserManagerContext);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2>
          <b>User list</b>
        </h2>
        <UserCreateModal />
      </div>
      <UserList users={users} />
    </div>
  );
}

export default Users;
