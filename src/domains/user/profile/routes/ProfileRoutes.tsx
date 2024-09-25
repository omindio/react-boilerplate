import { RouteObject } from 'react-router-dom';

import ProfilePage from '../pages/ProfilePage';

const ProfileRoutes: RouteObject[] = [
  {
    path: '/profile',
    element: <ProfilePage />,
  },
];

export default ProfileRoutes;
