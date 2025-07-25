import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/lib/axios';
import type {
  IFinancialSnapshot,
  IPaginatedResponse,
  IResponse,
} from '@/types/response';
import type { IUserListItem } from '@/types/user';

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
    queryFn: async () => {
      const { data } = await axiosClient.get<
        IResponse<
          {
            currency: string;
            count: number;
            percentage: string;
          }[]
        >
      >('/admin/getMonthlyTransactionPieChart');
      return data;
    },
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  });
};
