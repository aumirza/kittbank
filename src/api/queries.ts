import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/lib/axios';
import type { IPaginatedResponse, IResponse } from '@/types/response';
import type { IUserListItem } from '@/types/user';

// /getUser
export const useGetUsersQuery = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } =
        await axiosClient.get<IResponse<IPaginatedResponse<IUserListItem>>>(
          '/getUser'
        );
      return data;
    },
    select: (data) => data.data,
  });
};
