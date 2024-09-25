import React, { useEffect } from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = '404';
  }, []);

  return (
    <Result
      status="404"
      title="404"
      subTitle="Lo sentimos, la página que visitaste no existe."
      extra={
        <Button type="primary">
          <Link to="/dashboard">Volver al Dashboard</Link>
        </Button>
      }
    />
  );
};

export default NotFoundPage;
