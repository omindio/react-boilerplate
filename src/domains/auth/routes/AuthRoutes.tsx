import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPasswordPage'));
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
        path: 'forgot-password',
        element: (
          <Suspense>
            <ForgotPasswordPage />
          </Suspense>
        ),
      },
      {
        path: 'reset-password/:token',
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
