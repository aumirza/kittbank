import axios from 'axios';
import { API_BASE_URL } from '@/constants/api';
import { useAuthStore } from '@/stores/authStore';

const token = useAuthStore.getState().token;
export const axiosClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1/`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
