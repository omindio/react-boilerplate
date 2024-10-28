import React, { useEffect } from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Unauthorized';
  }, []);

  return (
    <Result
      status="403"
      title="403"
      subTitle="Lo sentimos, no tienes acceso a esta página."
      extra={
        <Button type="primary">
          <Link to="/dashboard">Volver al Dashboard</Link>
        </Button>
      }
    />
  );
};

export default UnauthorizedPage;
