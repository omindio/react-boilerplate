import React, { useEffect } from 'react';
import { Layout, theme } from 'antd';

import Breadcrumbs from '@shared/components/Breadcrumbs';
import HeaderLayout from '@shared/components/HeaderLayout';
import FooterLayout from '@shared/components/FooterLayout';

const { Content } = Layout;

interface AdminLayoutProps {
  children: React.ReactNode;
  metaTitle: string;
}

//TODO: Mejorar el responsive del layout y menu para mobile (padding, margin, etc)
const AdminLayout: React.FC<AdminLayoutProps> = ({ children, metaTitle }) => {
  const {
    token: { colorBgContainer, borderRadius },
  } = theme.useToken();

  useEffect(() => {
    document.title = metaTitle;
  }, []);

  return (
    <Layout>
      <HeaderLayout />
      <Content style={{ padding: '0 48px', flex: 1 }}>
        <Breadcrumbs />
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadius,
          }}
        >
          {children}
        </div>
      </Content>
      <FooterLayout />
    </Layout>
  );
};

export default AdminLayout;
