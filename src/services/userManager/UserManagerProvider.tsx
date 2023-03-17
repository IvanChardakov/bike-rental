import React, { useEffect, useState } from 'react';

import { messages } from '../../utils/messages';
import UserManagerContext from './UserManagerContext';
import { UserManagerType, IUser } from '../../types/user';
import { initialUsers } from '../../mockData/initialUsers';
import { CURRENT_USER_KEY, LOCAL_STORAGE_USERS_KEY } from '../../utils/constants';

const UserManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<IUser[]>(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERS_KEY) || JSON.stringify(initialUsers))
  );
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    const currentUserLocalStorage = localStorage.getItem(CURRENT_USER_KEY);
    if (currentUserLocalStorage) {
      setCurrentUser(JSON.parse(currentUserLocalStorage));
    }
  }, []);

  const createUser = (user: Omit<IUser, 'id'>) => {
    const newId = users?.length === 0 ? 0 : Math.max(...users.map((u) => u.id)) + 1;
    const newUser = { ...user, id: newId };
    if (users.find((u) => u.email === user.email)) {
      throw new Error(messages.email_exist);
    }
    setUsers((prev) => [...prev, newUser]);
  };

  const updateUser = (user: IUser) => {
    const updateUsers = users.map((u) => (u.id === user.id ? user : u));
    setUsers(updateUsers);
  };

  const deleteUser = (userId: number) => {
    const filteredUsers = users.filter((u) => u.id !== userId);
    setUsers(filteredUsers);
  };

  const getUserById = (userId: number): IUser | undefined => {
    const user = users.find((u) => u.id === userId);
    return user;
  };

  const login = (email: string, password: string): IUser | undefined => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      setCurrentUser(user);
    }

    return user;
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setCurrentUser(undefined);
  };

  const contextValue: UserManagerType = {
    users,
    currentUser,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    login,
    logout,
  };

  return <UserManagerContext.Provider value={contextValue}>{children}</UserManagerContext.Provider>;
};

export default UserManagerProvider;
