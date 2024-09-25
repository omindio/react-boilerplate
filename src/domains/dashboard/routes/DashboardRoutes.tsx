import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

import PermissionGuard from '@domains/auth/guards/PermissionGuard';

const AdminDashboardPage = lazy(() => import('../pages/AdminDashboardPage'));

const DashboardRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <PermissionGuard allowedRoles={['admin']} />,
    children: [
      {
        path: '',
        element: (
          <Suspense>
            <AdminDashboardPage />
          </Suspense>
        ),
      },
    ],
  },
];

export default DashboardRoutes;
