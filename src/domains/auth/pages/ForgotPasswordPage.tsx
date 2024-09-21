import React, { useEffect } from 'react';

const ForgotPasswordPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Forgot Password';
  }, []);

  return <>Forgot password page</>;
};

export default ForgotPasswordPage;
