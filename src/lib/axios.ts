import axios from 'axios';
import { API_BASE_URL } from '@/constants/api';

export const axiosClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1/admin`,
});
