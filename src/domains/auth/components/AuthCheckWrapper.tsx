import React from 'react';
import AuthLoader from './AuthLoader';
import useAuthCheck from '../hooks/useAuthCheck';
import { Outlet } from 'react-router-dom';

const AuthCheckWrapper: React.FC = () => {
  const { loading, initialAuthCheck } = useAuthCheck();

  if (loading && initialAuthCheck) {
    return <AuthLoader />;
  }

  return <Outlet />;
};

export default AuthCheckWrapper;
