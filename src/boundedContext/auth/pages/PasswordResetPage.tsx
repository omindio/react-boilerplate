import React, { useEffect } from 'react';

import AuthContainer from '../components/AuthContainer';
import AuthCard from '../components/AuthCard';

import PasswordResetForm from '../components/PasswordResetForm';

const PasswordResetPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Cambiar Contraseña';
  }, []);

  return (
    <AuthContainer>
      <AuthCard title="Cambiar Contraseña">
        <PasswordResetForm />
      </AuthCard>
    </AuthContainer>
  );
};

export default PasswordResetPage;
