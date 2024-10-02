import React from 'react';
import { Layout, Typography } from 'antd';
import styled from 'styled-components';

const { Footer } = Layout;

const FooterStyled = styled(Footer)`
  text-align: center;
  background: transparent;
`;

const FooterLayout: React.FC = () => {
  return (
    <FooterStyled>
      <Typography.Text type="secondary">
        React app © {new Date().getFullYear()}. Created by omind.io
      </Typography.Text>
    </FooterStyled>
  );
};

export default FooterLayout;
