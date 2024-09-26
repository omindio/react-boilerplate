import React, { useEffect } from 'react';
import { Layout } from 'antd';

import HeaderLayout from '@shared/components/HeaderLayout';
import ContentLayout from '@shared/components/ContentLayout';
import FooterLayout from '@shared/components/FooterLayout';
import Breadcrumbs from '@shared/components/Breadcrumbs';

interface AdminLayoutProps {
  children: React.ReactNode;
  metaTitle: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, metaTitle }) => {
  useEffect(() => {
    document.title = metaTitle;
  }, []);

  return (
    <Layout>
      <HeaderLayout />
      <Breadcrumbs />
      <ContentLayout>{children}</ContentLayout>
      <FooterLayout />
    </Layout>
  );
};

export default AdminLayout;
