import { RouteObject } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';

import GuestGuard from '../guards/GuestGuard';

const AuthRoutes: RouteObject[] = [
  {
    element: <GuestGuard />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
    ],
  },
];

export default AuthRoutes;
