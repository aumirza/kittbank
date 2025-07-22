import { lazy, Suspense } from 'react';
import { Route, type RouteObject, Routes } from 'react-router';
import DashboardLayout from './components/DashboardLayout';
import { LoadingScreen } from './components/LoadingScreen';

const LoginPage = lazy(() => import('./pages/Login'));

const OverviewPage = lazy(() => import('./pages/Overview'));

const authRoutes: RouteObject[] = [{ path: '/login', element: <LoginPage /> }];

const routes: RouteObject[] = [{ path: '/', element: <OverviewPage /> }];

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
        {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
      </Routes>
    </Suspense>
  );
}

export default App;
