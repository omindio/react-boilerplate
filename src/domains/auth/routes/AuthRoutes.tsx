import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const PasswordResetPage = lazy(() => import('../pages/PasswordResetPage'));
const ResetPasswordPage = lazy(() => import('../pages/ResetPasswordPage'));

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
            <PasswordResetPage />
          </Suspense>
        ),
      },
      {
        path: 'password/reset/:token',
        element: (
          <Suspense>
            <ResetPasswordPage />
          </Suspense>
        ),
      },
    ],
  },
];

export default AuthRoutes;
