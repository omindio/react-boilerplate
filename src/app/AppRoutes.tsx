import React, { lazy, Suspense } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

import AuthGuard from 'src/boundedContext/auth/guards/AuthGuard';
import AuthCheckWrapper from 'src/boundedContext/auth/components/AuthCheckWrapper';
import AuthRoutes from 'src/boundedContext/auth/routes/AuthRoutes';
import DashboardRoutes from 'src/boundedContext/dashboard/routes/DashboardRoutes';
import ProfileRoutes from 'src/boundedContext/user/profile/routes/ProfileRoutes';

const UnauthorizedPage = lazy(
  () => import('src/boundedContext/auth/pages/UnauthorizedPage')
);
const NotFoundPage = lazy(() => import('@shared/pages/NotFoundPage'));

const MainRoutes: React.FC = () => {
  const routes = [
    ...AuthRoutes,
    {
      element: (
        <AuthGuard>
          <AuthCheckWrapper />
        </AuthGuard>
      ),
      children: [...DashboardRoutes, ...ProfileRoutes],
    },
    {
      path: '/unauthorized',
      element: (
        <Suspense>
          <UnauthorizedPage />
        </Suspense>
      ),
    },
    {
      path: '/',
      element: <Navigate to="/dashboard" />,
    },
    {
      path: '*',
      element: (
        <Suspense>
          <NotFoundPage />
        </Suspense>
      ),
    },
  ];

  return useRoutes(routes);
};

export default MainRoutes;
