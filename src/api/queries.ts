import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/lib/axios';
import type { IATM } from '@/types/atm';
import type { ICurrency } from '@/types/currency';
import type { IContactPageData, IFaqItem, IStaticPageData } from '@/types/page';
import type {
  IFinancialSnapshot,
  IPaginatedResponse,
  IResponse,
} from '@/types/response';
import type {
  IRecentTransaction,
  ITransaction,
  ITransactionsDashboardResponse,
} from '@/types/transaction';
import type { IUserListItem, IUsersDashboardResponse } from '@/types/user';

// /getUser
export const useGetUsersQuery = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } =
        await axiosClient.get<IResponse<IPaginatedResponse<IUserListItem>>>(
          '/admin/getUser'
        );
      return data;
    },
    select: (data) => data.data,
  });
};

// /getFinancialSnapshot;
export const useGetFinancialSnapshotQuery = () => {
  return useQuery({
    queryKey: ['financialSnapshot'],
    queryFn: async () => {
      const { data } = await axiosClient.get<IResponse<IFinancialSnapshot>>(
        '/admin/getFinancialSnapshot'
      );
      return data;
    },
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  });
};

// getMonthlySpendingTrend?year=2024
export const useGetMonthlySpendingTrendQuery = (year: number) => {
  return useQuery({
    queryKey: ['monthlySpendingTrend', year],
    queryFn: async () => {
      const { data } = await axiosClient.get<
        IResponse<{
          year: number;
          monthlySpending: { month: string; amount: number }[];
        }>
      >(`/admin/getMonthlySpendingTrend?year=${year}`);
      return data;
    },
    select: (data) => data.data.monthlySpending,
    refetchOnWindowFocus: false,
  });
};

// /getMonthlyTransactionPieChart
export const useGetMonthlyTransactionPieChartQuery = () => {
  return useQuery({
    queryKey: ['monthlyTransactionPieChart'],
    queryFn: () =>
      axiosClient.get<
        IResponse<
          {
            currency: string;
            count: number;
            percentage: string;
          }[]
        >
      >('/admin/getMonthlyTransactionPieChart'),
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
  });
};

// Transaction/recentTransaction/
export const useGetAllTransactionsQuery = () => {
  return useQuery({
    queryKey: ['allTransactions'],
    queryFn: () =>
      axiosClient.get<IResponse<IPaginatedResponse<ITransaction>>>(
        '/Transaction/recentTransaction'
      ),
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
  });
};

// /admin/getRecentTransactions?limit=5
export const useGetRecentTransactionsQuery = (limit = 5) => {
  return useQuery({
    queryKey: ['recentTransactions', limit],
    queryFn: () =>
      axiosClient.get<
        IResponse<{
          transactions: IRecentTransaction[];
        }>
      >(`/admin/getRecentTransactions?limit=${limit}`),
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
  });
};

// /admin/getCurrencySummary
export const useGetCurrencySummaryQuery = () => {
  return useQuery({
    queryKey: ['currencySummary'],
    queryFn: () =>
      axiosClient.get<
        IResponse<{
          [key: string]: {
            amount: number;
            percentChange: number;
          };
        }>
      >('/admin/getCurrencySummary'),
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
  });
};

// /admin/getMonthlyCurrencySummary
export const useGetMonthlyCurrencySummaryQuery = () => {
  return useQuery({
    queryKey: ['monthlyCurrencySummary'],
    queryFn: () =>
      axiosClient.get<
        IResponse<{
          [key: string]: {
            currency: string;
            count: number;
            percentChange: number;
          };
        }>
      >('/admin/getMonthlyCurrencySummary'),
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
  });
};

//Transaction/getDashboard
export const useGetTransactionsDashboardQuery = () => {
  return useQuery({
    queryKey: ['transactionsDashboard'],
    queryFn: () =>
      axiosClient.get<IResponse<ITransactionsDashboardResponse>>(
        '/Transaction/getDashboard'
      ),
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
  });
};

///admin/getDashboard
export const useGetUsersDashboardQuery = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () =>
      axiosClient.get<IUsersDashboardResponse>('/admin/getDashboard'),
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  });
};

// /admin/Atm/allAtm
export const useGetAllAtmsQuery = () => {
  return useQuery({
    queryKey: ['allAtms'],
    queryFn: () =>
      axiosClient.get<IResponse<IPaginatedResponse<IATM>>>('/admin/Atm/allAtm'),
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
  });
};

// {{url}}/admin/Currency/allCurrency
export const useGetAllCurrenciesQuery = () => {
  return useQuery({
    queryKey: ['allCurrencies'],
    queryFn: () =>
      axiosClient.get<IResponse<IPaginatedResponse<ICurrency>>>(
        '/admin/Currency/allCurrency'
      ),
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
  });
};

// {{url}}/static/getAboutUs
export const useGetAboutUsQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: ['aboutUs'],
    enabled,
    queryFn: () =>
      axiosClient.get<IResponse<IStaticPageData>>('/static/getAboutUs'),
    select: (data) => data.data,
  });
};

// {{url}}/static/getPrivacy
export const useGetPrivacyQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: ['privacy'],
    enabled,
    queryFn: () =>
      axiosClient.get<IResponse<IStaticPageData>>('/static/getPrivacy'),
    select: (data) => data.data,
  });
};

// {{url}}/static/getReturnRefundPolicy
export const useGetReturnRefundPolicyQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: ['returnRefundPolicy'],
    enabled,
    queryFn: () =>
      axiosClient.get<IResponse<IStaticPageData>>(
        '/static/getReturnRefundPolicy'
      ),
    select: (data) => data.data,
  });
};

// {{url}}/static/getCookiesPolicy
export const useGetCookiesPolicyQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: ['cookiesPolicy'],
    enabled,
    queryFn: () =>
      axiosClient.get<IResponse<IStaticPageData>>('/static/getCookiesPolicy'),
    select: (data) => data.data,
  });
};

// {{url}}/static/getTerms
export const useGetTermsQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: ['terms'],
    enabled,
    queryFn: () =>
      axiosClient.get<IResponse<IStaticPageData>>('/static/getTerms'),
    select: (data) => data.data,
  });
};

// {{url}}/static/viewContactDetails
export const useGetContactDetailsQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: ['contactDetails'],
    enabled,
    queryFn: () =>
      axiosClient.get<IResponse<IContactPageData>>(
        '/static/viewContactDetails'
      ),
    select: (data) => data.data,
  });
};

// {{url}}/static/faq/All
export const useGetAllFaqsQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: ['allFaqs'],
    enabled,
    queryFn: () => axiosClient.get<IResponse<IFaqItem[]>>('/static/faq/All'),
    select: (data) => data.data.data,
  });
};
