import React from 'react';
import { Card, Typography, theme } from 'antd';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
}

const AuthCard: React.FC<AuthCardProps> = ({ children, title }) => {
  const {
    token: { borderRadius },
  } = theme.useToken();
  return (
    <Card style={{ width: 330, borderRadius: borderRadius }}>
      <Typography.Title level={3} style={{ textAlign: 'center' }}>
        {title}
      </Typography.Title>
      {children}
    </Card>
  );
};
export default AuthCard;
