export interface IUser {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  userType: 'ADMIN' | 'USER';
}
