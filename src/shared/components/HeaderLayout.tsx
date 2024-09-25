import React from 'react';
import { Menu, Dropdown, Avatar, Space, Layout } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutRequest } from '@domains/auth/redux/authSlice';
import Logo from '@shared/components/Logo';

import {
  DashboardTwoTone,
  LogoutOutlined,
  ProfileOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

//TODO: Separar los componentes de menu y dropdown
const HeaderLayout: React.FC = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: any) => state.auth);
  const renderMenuItems = () => {
    switch (user.roles[0]) {
      case 'admin':
        return [
          {
            label: <Link to="/dashboard">Dashboard</Link>,
            key: 'dashboard',
            icon: <DashboardTwoTone />,
          },
        ];
      default:
        return [
          {
            label: <Link to="/dashboard">Dashboard</Link>,
            key: 'dashboard',
            icon: <DashboardTwoTone />,
          },
        ];
    }
  };

  const userMenuItems = [
    {
      label: <Link to="/profile">Perfil</Link>,
      key: 'profile',
      icon: <ProfileOutlined />,
    },
    {
      label: 'Cerrar sesión',
      key: 'logout',
      icon: <LogoutOutlined />,
      onClick: () => dispatch(logoutRequest()),
    },
  ];
  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      <Logo style={{ height: 32 }} />
      <Menu
        style={{ flex: 1 }}
        mode="horizontal"
        items={renderMenuItems()}
      ></Menu>
      <Dropdown menu={{ items: userMenuItems }}>
        <Space style={{ cursor: 'pointer' }}>
          <Avatar size="small" style={{ backgroundColor: '#87d068' }}>
            {user.name[0]}
          </Avatar>
          <span>{user.name}</span>
        </Space>
      </Dropdown>
    </Header>
  );
};

export default HeaderLayout;
