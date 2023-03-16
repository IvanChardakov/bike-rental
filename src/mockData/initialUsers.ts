import { IUser } from '../types/user';

export const initialUsers: IUser[] = [
  {
    id: 0,
    email: 'manager@bikerental.com',
    password: 'admin',
    role: 'manager',
  },
  {
    id: 1,
    email: 'user@test.com',
    password: 'user123',
    role: 'user',
  },
];
