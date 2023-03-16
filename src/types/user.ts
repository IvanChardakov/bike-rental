export interface IUser {
  id: number;
  email: string;
  password: string;
  role: 'user' | 'manager';
}

export type UserManagerType = {
  users: IUser[];
  currentUser: IUser | undefined;
  createUser: (user: Omit<IUser, 'id'>) => void;
  updateUser: (user: IUser) => void;
  deleteUser: (id: number) => void;
  getUserById: (id: number) => IUser | undefined;
  login: (email: string, password: string) => IUser | undefined;
  logout: () => void;
};
