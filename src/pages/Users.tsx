import React, { useContext } from 'react';
import UserList from '../components/User/UserList';
import UserManagerContext from '../services/userManager/UserManagerContext';

function Users() {
  const { users } = useContext(UserManagerContext);

  return <UserList users={users} />;
}

export default Users;
