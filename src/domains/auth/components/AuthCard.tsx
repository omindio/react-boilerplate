import React from 'react';
import { Card, Typography, theme } from 'antd';
import styled from 'styled-components';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
}

const CardStyled = styled(Card).withConfig({
  shouldForwardProp: (prop) => !['borderRadius'].includes(prop),
})<{ borderRadius: number }>`
  width: 330px;
  border-radius: ${(props) => props.borderRadius}px;
`;
const TitleStyled = styled(Typography.Title)`
  text-align: center;
  margin-bottom: 25px !important;
`;

const AuthCard: React.FC<AuthCardProps> = ({ children, title }) => {
  const {
    token: { borderRadius },
  } = theme.useToken();
  return (
    <CardStyled borderRadius={borderRadius}>
      <TitleStyled level={3}>{title}</TitleStyled>
      {children}
    </CardStyled>
  );
};
export default AuthCard;
