import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

import AuthGuard from '@domains/auth/guards/AuthGuard';
import AuthCheckWrapper from '@domains/auth/components/AuthCheckWrapper';
import AuthRoutes from '@domains/auth/routes/AuthRoutes';
import DashboardRoutes from '@domains/dashboard/routes/DashboardRoutes';
import ProfileRoutes from '@domains/user/profile/routes/ProfileRoutes';
import UnauthorizedPage from '@domains/auth/pages/UnauthorizedPage';
import NotFoundPage from '@shared/pages/NotFoundPage';

const MainRoutes: React.FC = () => {
  const routes = [
    ...AuthRoutes,
    {
      element: (
        <AuthCheckWrapper>
          <AuthGuard />
        </AuthCheckWrapper>
      ),
      children: [...DashboardRoutes, ...ProfileRoutes],
    },
    {
      path: '/unauthorized',
      element: <UnauthorizedPage />,
    },
    {
      path: '/',
      element: <Navigate to="/dashboard" />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ];

  return useRoutes(routes);
};

export default MainRoutes;
