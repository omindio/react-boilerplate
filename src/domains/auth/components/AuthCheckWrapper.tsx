import React, { useEffect, useState } from 'react';
import AuthLoader from './AuthLoader';
import useAuthCheck from '../hooks/useAuthCheck';

interface AuthCheckWrapperProps {
  children: React.ReactNode;
}

const AuthCheckWrapper: React.FC<AuthCheckWrapperProps> = ({ children }) => {
  const { loading } = useAuthCheck();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (!loading && initialLoad) {
      const timer = setTimeout(() => {
        setInitialLoad(false);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [loading, initialLoad]);

  if (loading || initialLoad) {
    return <AuthLoader />;
  }

  return <>{children}</>;
};

export default AuthCheckWrapper;
