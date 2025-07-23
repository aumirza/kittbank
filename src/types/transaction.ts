export interface ITransaction {
  id: string;
  name: string;
  date: string;
  time: string;
  amount: number;
  currency: string;
  platform: string;
  fromUser: string;
  toUser: string;
  status: 'completed' | 'pending' | 'failed';
}
