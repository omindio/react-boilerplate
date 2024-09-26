import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Dropdown, Avatar, Space } from 'antd';
import { Link } from 'react-router-dom';
import { logoutRequest } from '@domains/auth/redux/authSlice';

import { LogoutOutlined, ProfileOutlined } from '@ant-design/icons';

const SpaceStyled = styled(Space)`
  cursor: pointer;
`;
const AvatarStyled = styled(Avatar)`
  background-color: #87d068;
`;

const UserMenuDropdown: React.FC = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: any) => state.auth);

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
    <Dropdown menu={{ items: userMenuItems }}>
      <SpaceStyled>
        <AvatarStyled shape="square" size="small">
          {user.name[0]}
        </AvatarStyled>
        <span>{user.name}</span>
      </SpaceStyled>
    </Dropdown>
  );
};

export default UserMenuDropdown;
