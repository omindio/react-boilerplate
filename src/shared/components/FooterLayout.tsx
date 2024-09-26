import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';

const { Footer } = Layout;

const FooterStyled = styled(Footer)`
  text-align: center;
`;

const FooterLayout: React.FC = () => {
  return (
    <FooterStyled>
      React app ©{new Date().getFullYear()} Created by omind.io
    </FooterStyled>
  );
};

export default FooterLayout;
