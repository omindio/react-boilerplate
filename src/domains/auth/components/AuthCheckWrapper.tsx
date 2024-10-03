import React from 'react';
import AuthLoader from './AuthLoader';
import useAuthCheck from '../hooks/useAuthCheck';

interface AuthCheckWrapperProps {
  children: React.ReactNode;
}

const AuthCheckWrapper: React.FC<AuthCheckWrapperProps> = ({ children }) => {
  const { loading, initialAuthCheck } = useAuthCheck();

  if (loading && initialAuthCheck) {
    return <AuthLoader />;
  }

  return <>{children}</>;
};

export default AuthCheckWrapper;
