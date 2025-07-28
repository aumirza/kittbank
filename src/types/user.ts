export interface IUserListItem {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  userType: 'ADMIN' | 'USER';
  userStatus: 'Active' | 'Inactive';
  wallet: number;
  rating: number;
  totalTransaction: number;
  createdAt: string;
  updatedAt: string;
  accountVerification: boolean;
  isRegistration: boolean;
  securityPrivacy: boolean;
  moveMoney: boolean;
  unlockTheApp: boolean;
  pushNotification: boolean;
  callNotification: boolean;
  mailNotification: boolean;
  cashTermNotification: boolean;
  image?: string;
  joinUser?: string[];
  likeByUser?: string[];
}

export interface IUser {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  userType: 'ADMIN' | 'USER';
}

export interface IUsersDashboardResponse {
  newUsers: number;
  incomingTransfers: number;
  outgoingTransfers: number;
  kycPending: number;
  suspendedAccounts: number;
}
