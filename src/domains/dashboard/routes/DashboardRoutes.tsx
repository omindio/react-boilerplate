import { RouteObject } from 'react-router-dom';

import AdminDashboardPage from '../pages/AdminDashboardPage';
import PermissionGuard from '@domains/auth/guards/PermissionGuard';

const DashboardRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <PermissionGuard allowedRoles={['admin']} />,
    children: [{ path: '', element: <AdminDashboardPage /> }],
  },
];

export default DashboardRoutes;
