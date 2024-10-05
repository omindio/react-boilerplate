import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { RootState } from 'src/app/redux/store';

interface AuthCheckWrapperProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthCheckWrapperProps> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default AuthGuard;
