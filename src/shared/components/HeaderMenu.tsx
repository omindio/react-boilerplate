import React from 'react';
import styled from 'styled-components';
import { Menu } from 'antd';
import { useAppSelector } from 'src/app/redux/store';
import { Link, useLocation } from 'react-router-dom';
import { DashboardOutlined } from '@ant-design/icons';

const MenuStyled = styled(Menu)`
  flex: 1;
  justify-content: flex-end;
`;

const HeaderMenu: React.FC = () => {
  const location = useLocation();
  const { user } = useAppSelector((state: any) => state.auth);
  const renderMenuItems = () => {
    switch (user.roles[0]) {
      case 'admin':
        return [
          {
            label: <Link to="/dashboard">Dashboard</Link>,
            key: '/dashboard',
            icon: <DashboardOutlined />,
          },
        ];
      default:
        return [
          {
            label: <Link to="/dashboard">Dashboard</Link>,
            key: '/dashboard',
            icon: <DashboardOutlined />,
          },
        ];
    }
  };
  return (
    <MenuStyled
      mode="horizontal"
      selectedKeys={[location.pathname]}
      items={renderMenuItems()}
    ></MenuStyled>
  );
};

export default HeaderMenu;
