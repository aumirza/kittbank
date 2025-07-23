import { lazy, Suspense } from 'react';
import { Route, type RouteObject, Routes } from 'react-router';
import DashboardLayout from './components/DashboardLayout';
import { LoadingScreen } from './components/LoadingScreen';

const LoginPage = lazy(() => import('./pages/Login'));
const OverviewPage = lazy(() => import('./pages/Overview'));
const TicketsPage = lazy(() => import('./pages/Tickets'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const TransactionsPage = lazy(() => import('./pages/Transactions'));
const UsersPage = lazy(() => import('./pages/Users'));

const authRoutes: RouteObject[] = [{ path: '/login', element: <LoginPage /> }];

const routes: RouteObject[] = [
  { path: '/', element: <OverviewPage /> },
  { path: '/ticket', element: <TicketsPage /> },
  { path: '/transactions', element: <TransactionsPage /> },
  { path: '/user', element: <UsersPage /> },
];

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {authRoutes.map((route) => (
          <Route element={route.element} key={route.path} path={route.path} />
        ))}
        <Route element={<DashboardLayout />}>
          {routes.map((route) => (
            <Route element={route.element} key={route.path} path={route.path} />
          ))}
        </Route>
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </Suspense>
  );
}

export default App;
