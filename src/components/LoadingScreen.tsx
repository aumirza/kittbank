import { Loader } from '@/components/Loader';

export function LoadingScreen() {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-primary">
      <Loader size="lg" />
    </div>
  );
}
