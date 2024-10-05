import React, { lazy, Suspense } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

import AuthGuard from '@domains/auth/guards/AuthGuard';
import AuthCheckWrapper from '@domains/auth/components/AuthCheckWrapper';
import AuthRoutes from '@domains/auth/routes/AuthRoutes';
import DashboardRoutes from '@domains/dashboard/routes/DashboardRoutes';
import ProfileRoutes from '@domains/user/profile/routes/ProfileRoutes';

const UnauthorizedPage = lazy(
  () => import('@domains/auth/pages/UnauthorizedPage')
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
