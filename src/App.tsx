import { lazy, Suspense } from 'react';
import { Route, type RouteObject, Routes } from 'react-router';

const LoginPage = lazy(() => import('./pages/Login'));

const OverviewPage = lazy(() => import('./pages/Overview'));

const authRoutes: RouteObject[] = [{ path: '/login', element: <LoginPage /> }];

const routes: RouteObject[] = [{ path: '/', element: <OverviewPage /> }];

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* <Route element={<div>Layout</div>}>
        </Route> */}
        {authRoutes.map((route) => (
          <Route element={route.element} key={route.path} path={route.path} />
        ))}
        {routes.map((route) => (
          <Route element={route.element} key={route.path} path={route.path} />
        ))}
        {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
      </Routes>
    </Suspense>
  );
}

export default App;
