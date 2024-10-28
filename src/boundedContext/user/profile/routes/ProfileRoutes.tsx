import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

const ProfilePage = lazy(() => import('../pages/ProfilePage'));

const ProfileRoutes: RouteObject[] = [
  {
    path: '/profile',
    element: (
      <Suspense>
        <ProfilePage />
      </Suspense>
    ),
  },
];

export default ProfileRoutes;
