import React, { useEffect } from 'react';
import AuthContainer from '../components/AuthContainer';
import AuthCard from '../components/AuthCard';
import RequestPasswordResetForm from '../components/RequestPasswordResetForm';

const RequestPasswordResetPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Recuperar Contraseña';
  }, []);

  return (
    <AuthContainer>
      <AuthCard title="Recuperar Contraseña">
        <RequestPasswordResetForm />
      </AuthCard>
    </AuthContainer>
  );
};

export default RequestPasswordResetPage;
