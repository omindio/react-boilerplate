import React, { useEffect } from 'react';

import AuthContainer from '../components/AuthContainer';
import AuthCard from '../components/AuthCard';

import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    <AuthContainer>
      <AuthCard title="Iniciar Sesión">
        <LoginForm />
      </AuthCard>
    </AuthContainer>
  );
};

export default LoginPage;
