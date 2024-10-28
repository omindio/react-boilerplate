import React from 'react';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Logo from '@shared/components/Logo';

const ContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

const AuthLoader: React.FC = () => (
  <ContainerStyled>
    <Logo style={{ height: '80px', marginBottom: '30px' }} />
    <Spin indicator={<LoadingOutlined spin />} size="large" />
  </ContainerStyled>
);

export default AuthLoader;
