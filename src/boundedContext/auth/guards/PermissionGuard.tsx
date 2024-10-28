import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from 'src/app/redux/store';

interface PermissionGuardProps {
  allowedRoles?: string[];
  allowedPermissions?: string[];
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({
  allowedRoles = [],
  allowedPermissions = [],
}) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const userRoles = user?.roles || [];
  const userPermissions = user?.permissions || [];

  const hasRequiredRole = allowedRoles.some((role) => userRoles.includes(role));
  const hasRequiredPermission = allowedPermissions.some((perm) =>
    userPermissions.includes(perm)
  );

  if (allowedRoles && !hasRequiredRole && !hasRequiredPermission) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default PermissionGuard;
