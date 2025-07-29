import { QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense } from 'react';
import { Route, type RouteObject, Routes } from 'react-router';
import { AuthLayout } from './components/AuthLayout';
import { AuthWrapper } from './components/AuthWrapper';
import { DashboardLayout } from './components/DashboardLayout';
import { LoadingScreen } from './components/LoadingScreen';
import { queryClient } from './lib/queryclient';

const LoginPage = lazy(() => import('./pages/Login'));
const RegisterPage = lazy(() => import('./pages/Register'));
const OverviewPage = lazy(() => import('./pages/Overview'));
const TicketsPage = lazy(() => import('./pages/Tickets'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const TransactionsPage = lazy(() => import('./pages/Transactions'));
const UsersPage = lazy(() => import('./pages/Users'));
const AnalyticsPage = lazy(() => import('./pages/Analytics'));
const SetupPage = lazy(() => import('./pages/Setup'));
const AccountPage = lazy(() => import('./pages/Account'));

const authRoutes: RouteObject[] = [
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
];

const routes: RouteObject[] = [
  { path: '/', element: <OverviewPage /> },
  { path: '/ticket', element: <TicketsPage /> },
  { path: '/transactions', element: <TransactionsPage /> },
  { path: '/user', element: <UsersPage /> },
  { path: '/analytics', element: <AnalyticsPage /> },
  { path: '/setup', element: <SetupPage /> },
  { path: '/account', element: <AccountPage /> },
];

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route element={<AuthLayout />}>
            {authRoutes.map((route) => (
              <Route
                element={route.element}
                key={route.path}
                path={route.path}
              />
            ))}
          </Route>
          <Route
            element={
              <AuthWrapper>
                <DashboardLayout />
              </AuthWrapper>
            }
          >
            {routes.map((route) => (
              <Route
                element={route.element}
                key={route.path}
                path={route.path}
              />
            ))}
          </Route>
          <Route element={<NotFoundPage />} path="*" />
        </Routes>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
