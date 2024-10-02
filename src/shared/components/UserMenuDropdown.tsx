import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Dropdown, Avatar, Space } from 'antd';
import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import { GlobalHotKeys } from 'react-hotkeys';
import {
  logoutRequest,
  clearInitialAuthCheck,
} from '@domains/auth/redux/authSlice';

import { DownSquareOutlined } from '@ant-design/icons';

const SpaceStyled = styled(Space)`
  cursor: pointer;
`;
const AvatarStyled = styled(Avatar)`
  background-color: #87d068;
`;

const UserMenuDropdown: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'userName',
      label: user.name,
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      label: <Link to="/profile">Perfil</Link>,
      key: 'profile',
      extra: '⌘P',
    },
    {
      label: 'Cerrar sesión',
      key: 'logout',
      extra: '⌘L',
      onClick: () => {
        dispatch(clearInitialAuthCheck());
        dispatch(logoutRequest());
      },
    },
  ];

  const keyMap = {
    OPEN_PROFILE: ['ctrl+p', 'command+p'],
    LOGOUT: ['ctrl+l', 'command+l'],
  };

  const handlers = {
    OPEN_PROFILE: (event?: KeyboardEvent) => {
      event?.preventDefault();
      navigate('/profile');
    },
    LOGOUT: (event?: KeyboardEvent) => {
      event?.preventDefault();
      dispatch(logoutRequest());
    },
  };

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      <Dropdown menu={{ items: userMenuItems }}>
        <SpaceStyled>
          <AvatarStyled shape="square" size="small">
            {user.name[0]}
          </AvatarStyled>
          <DownSquareOutlined />
        </SpaceStyled>
      </Dropdown>
    </GlobalHotKeys>
  );
};

export default UserMenuDropdown;
