import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { axiosClient } from '@/lib/axios';
import { useAuthStore } from '@/stores/authStore';
import type { IATM } from '@/types/atm';
import type { ICurrency } from '@/types/currency';

export function useLoginMutation() {
  const login = useAuthStore((state) => state.login);
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: { email: string; password: string }) => {
      try {
        const response = await axiosClient.post('/admin/signin', data);
        login(response.data.accessToken, response.data.data);
        return response;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || 'Login failed');
        }
        return Promise.reject(error);
      }
    },
  });
}

export function useAddAtmMutation() {
  return useMutation({
    mutationKey: ['addAtm'],
    mutationFn: (data: Partial<IATM>) =>
      axiosClient.post('/admin/Atm/addAtm', data),
  });
}

export function useAddCurrencyMutation() {
  return useMutation({
    mutationKey: ['addCurrency'],
    mutationFn: (data: Partial<ICurrency>) =>
      axiosClient.post('/admin/Currency/addCurrency', data),
  });
}
