import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import UserMenuDropdown from './UserMenuDropdown';
import HeaderMenu from './HeaderMenu';

const Logo = React.lazy(() => import('@shared/components/Logo'));
const { Header } = Layout;

const HeaderStyled = styled(Header)`
  padding: 0 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  column-gap: 30px;

  @media (max-width: 768px) {
    column-gap: 20px;
    padding: 0 15px;
  }

  @media (max-width: 480px) {
    column-gap: 10px;
    padding: 0 10px;
  }
`;

const HeaderLayout: React.FC = () => {
  return (
    <HeaderStyled>
      <Logo style={{ height: 32 }} />
      <HeaderMenu />
      <UserMenuDropdown />
    </HeaderStyled>
  );
};

export default HeaderLayout;
