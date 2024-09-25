import React from 'react';
import { Space } from 'antd';
import Logo from '@shared/components/Logo';

interface AuthContainerProps {
  children: React.ReactNode;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => (
  <Space
    direction="vertical"
    align="center"
    style={{
      width: '100%',
      height: '100vh',
      justifyContent: 'center',
      backgroundColor: '#f0f2f5',
    }}
  >
    <Logo style={{ height: 80, marginBottom: '30px' }} />
    {children}
  </Space>
);

export default AuthContainer;
