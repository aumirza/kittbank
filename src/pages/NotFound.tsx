import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h1 className="mb-4 font-bold text-6xl text-primary">404</h1>
      <h2 className="mb-2 font-semibold text-2xl text-gray-800">
        Page Not Found
      </h2>
      <p className="mb-6 text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button className="" onClick={goBack} size="lg">
        Go Back
      </Button>
    </div>
  );
}
