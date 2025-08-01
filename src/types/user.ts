export interface IUserListItem {
  _id: string;
  currency: string;
  platForm: string;
  lockCard: boolean;
  permissions: string[];
  password?: string;
  __v?: number;
  firstName: string;
  lastName: string;
  fullName: string;
  mobileNumber: string;
  email: string;
  accountVerification: boolean;
  isRegistration: boolean;
  image?: string;
  joinUser?: string[];
  likeByUser?: string[];
  userType: 'ADMIN' | 'USER';
  userStatus: 'Active' | 'Inactive';
  wallet: number;
  rating: number;
  totalTransaction: number;
  securityPrivacy: boolean;
  moveMoney: boolean;
  unlockTheApp: boolean;
  pushNotification: boolean;
  callNotification: boolean;
  mailNotification: boolean;
  cashTermNotification: boolean;
  createdAt: string;
  updatedAt: string;
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
