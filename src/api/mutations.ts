import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { axiosClient } from '@/lib/axios';
import { useAuthStore } from '@/stores/authStore';
import type { IATM } from '@/types/atm';
import type { ICurrency } from '@/types/currency';
import type { IFaqItem } from '@/types/page';
import type { IResponse } from '@/types/response';
import type { IUser } from '@/types/user';

// /{{url}}/admin/registration
export function useRegisterMutation() {
  const login = useAuthStore((state) => state.login);
  return useMutation({
    mutationKey: ['register'],
    mutationFn: async (data: {
      fullName: string;
      firstName: string;
      lastName: string;
      mobileNumber: string;
      email: string;
      password: string;
    }) => {
      try {
        const response = await axiosClient.post('/admin/registration', data);
        login(response.data.accessToken, response.data.data);
        return response;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || 'Registration failed'
          );
        }
      }
    },
  });
}

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

// {{url}}/admin/forgetPassword
export function useForgotPasswordMutation() {
  return useMutation({
    mutationKey: ['forgotPassword'],
    mutationFn: (data: { email: string }) =>
      axiosClient.post('/admin/forgetPassword', data),
  });
}

//admin/forgotVerifyOtp
export function useForgotVerifyOtpMutation() {
  return useMutation({
    mutationKey: ['forgotVerifyOtp'],
    mutationFn: (data: { email: string; otp: string }) =>
      axiosClient.post('/admin/forgotVerifyOtp', data),
  });
}

// {{url}}/admin/changePassword/{{id}}{
export function useResetPasswordMutation() {
  return useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: async (data: {
      userId: string;
      newPassword: string;
      confirmPassword: string;
    }) => axiosClient.post(`/admin/changePassword/${data.userId}`, data),
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

// /admin/update
export function useUpdateUserMutation() {
  const updateUser = useAuthStore((state) => state.updateUser);
  return useMutation({
    mutationKey: ['updateUser'],
    mutationFn: (data: Partial<IUser & { phone: string }>) =>
      axiosClient.put<IResponse<IUser>>('/admin/update', data),
    onSuccess: (response) => {
      // Update the user in the auth store with the response data
      if (response.data?.data) {
        updateUser(response.data.data);
      }
    },
  });
}

//{{url}}/admin/Currency/deleteCurrency/{{id}} DELETE
export function useDeleteCurrencyMutation() {
  return useMutation({
    mutationKey: ['deleteCurrency'],
    mutationFn: (id: string) =>
      axiosClient.delete(`/admin/Currency/deleteCurrency/${id}`),
  });
}

// {{url}}/static/createAboutus
export const useCreateOrUpdatePageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      type,
      data,
    }: {
      type: string;
      data: { title: string; description: string };
    }) => {
      switch (type) {
        case 'privacy':
          return axiosClient.post('/static/createPrivacy', data);
        case 'returnRefund':
          return axiosClient.post('/static/createReturnRefundPolicy', data);
        case 'cookies':
          return axiosClient.post('/static/createCookiesPolicy', data);
        case 'terms':
          return axiosClient.post('/static/createTerms', data);
        default:
          throw new Error('Invalid type');
      }
    },
    mutationKey: ['createOrUpdatePage'],
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['privacy'] });
      queryClient.invalidateQueries({ queryKey: ['returnRefundPolicy'] });
      queryClient.invalidateQueries({ queryKey: ['cookiesPolicy'] });
      queryClient.invalidateQueries({ queryKey: ['terms'] });
    },
  });
};

// {{url}}/static/addContactDetails
export const useCreateOrUpdateContactMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) =>
      axiosClient.post('/static/addContactDetails', data),
    mutationKey: ['createOrUpdateContact'],
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['contactDetails'] });
    },
  });
};

export const useCreateOrUpdateAboutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) =>
      axiosClient.post('/static/createAboutus', data),
    mutationKey: ['createOrUpdateAbout'],
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['aboutUs'] });
    },
  });
};

// {{url}}/static/faq/createFaq
export const useCreateFaqMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { answer: string; question: string }) =>
      axiosClient.post('/static/faq/createFaq', data),
    mutationKey: ['createFaq'],
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
    },
  });
};

// {{url}}/static/faq/{{id}}
export const useUpdateFaqMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<IFaqItem> }) =>
      axiosClient.put(`/static/faq/${id}`, data),
    mutationKey: ['updateFaq'],
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
    },
  });
};
