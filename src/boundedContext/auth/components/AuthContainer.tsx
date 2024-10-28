import React from 'react';
import styled from 'styled-components';
import { Space } from 'antd';
import Logo from '@shared/components/Logo';
import FooterLayout from '@shared/components/FooterLayout';

const SpaceStyled = styled(Space)`
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  background-color: #f0f2f5;
`;

interface AuthContainerProps {
  children: React.ReactNode;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => (
  <SpaceStyled direction="vertical" align="center">
    <Logo style={{ height: 80, marginBottom: '30px', marginTop: '24px' }} />
    {children}
    <FooterLayout />
  </SpaceStyled>
);

export default AuthContainer;
