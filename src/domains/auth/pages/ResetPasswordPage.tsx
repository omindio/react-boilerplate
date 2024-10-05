import React, { useEffect } from 'react';

import AuthContainer from '../components/AuthContainer';
import AuthCard from '../components/AuthCard';

import ResetPasswordForm from '../components/ResetPasswordForm';

const ResetPasswordPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Reset Password';
  }, []);

  return (
    <AuthContainer>
      <AuthCard title="Cambiar Contraseña">
        <ResetPasswordForm />
      </AuthCard>
    </AuthContainer>
  );
};

export default ResetPasswordPage;
