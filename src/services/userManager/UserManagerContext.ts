import { createContext } from 'react';
import { UserManagerType } from '../../types/user';

const UserManagerContext = createContext<UserManagerType>({
  users: [],
  currentUser: undefined,
  createUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
  getUserById: () => undefined,
  login: () => undefined,
  logout: () => {},
});

export default UserManagerContext;
