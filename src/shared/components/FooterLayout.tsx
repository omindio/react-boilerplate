import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const FooterLayout: React.FC = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      React app ©{new Date().getFullYear()} Created by omind.io
    </Footer>
  );
};

export default FooterLayout;
