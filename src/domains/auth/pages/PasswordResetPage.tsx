import React, { useEffect } from 'react';
import AuthContainer from '../components/AuthContainer';
import AuthCard from '../components/AuthCard';
import ForgotPasswordForm from '../components/PasswordResetForm';

const PasswordResetPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Forgot Password';
  }, []);

  return (
    <AuthContainer>
      <AuthCard title="Recuperar Contraseña">
        <ForgotPasswordForm />
      </AuthCard>
    </AuthContainer>
  );
};

export default PasswordResetPage;
