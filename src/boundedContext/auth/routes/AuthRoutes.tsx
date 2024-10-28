import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const RequestPasswordResetPage = lazy(
  () => import('../pages/RequestPasswordResetPage')
);
const PasswordResetPage = lazy(() => import('../pages/PasswordResetPage'));

import GuestGuard from '../guards/GuestGuard';

const AuthRoutes: RouteObject[] = [
  {
    element: <GuestGuard />,
    children: [
      {
        path: 'login',
        element: (
          <Suspense>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: 'password/request',
        element: (
          <Suspense>
            <RequestPasswordResetPage />
          </Suspense>
        ),
      },
      {
        path: 'password/reset/:token',
        element: (
          <Suspense>
            <PasswordResetPage />
          </Suspense>
        ),
      },
    ],
  },
];

export default AuthRoutes;
