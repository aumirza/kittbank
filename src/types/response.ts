export interface IResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface IPaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null | number;
  nextPage: null | number;
}

export interface IFinancialSnapshot {
  totalBalance: string;
  monthlySpending: string;
  incomeThisMonth: string;
  upcomingPayments: number;
  savingsRate: string;
}
