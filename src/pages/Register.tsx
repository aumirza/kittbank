import { Navigate } from 'react-router';
import { RegisterForm } from '@/components/RegisterForm';
import { useAuthStore } from '@/stores/authStore';

export default function Register() {
  const token = useAuthStore((state) => state.token);
  if (token) {
    return <Navigate replace to="/" />;
  }
  return <RegisterForm />;
}
