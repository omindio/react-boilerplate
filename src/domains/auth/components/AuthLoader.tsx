import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Logo from '@shared/components/Logo';

const AuthLoader: React.FC = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
    }}
  >
    <Logo style={{ height: '80px', marginBottom: '30px' }} />
    <Spin indicator={<LoadingOutlined spin />} size="large" />
  </div>
);

export default AuthLoader;
