import React, { useEffect } from 'react';

const UnauthorizedPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Unauthorized';
  }, []);

  return <>UnauthorizedPage</>;
};

export default UnauthorizedPage;
