export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type BikeFormData = {
  model: string;
  color: string;
  location: string;
  rating: number;
  isAvailable: boolean;
};

export interface ReservationFormData {
  fromDate: Date;
  toDate: Date;
}
