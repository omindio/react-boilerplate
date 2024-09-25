import React from 'react';
import logo from '@shared/assets/logo.svg';

interface AuthContainerProps {
  style: object;
}

const Logo: React.FC<AuthContainerProps> = ({ style }) => (
  <img src={logo} alt="logo" style={style} />
);

export default Logo;
