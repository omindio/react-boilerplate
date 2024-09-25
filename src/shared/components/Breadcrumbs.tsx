import React from 'react';
import { Breadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import breadcrumbNameMap from '../utils/breadcrumbMap';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);

  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return {
      key: url,
      title: <Link to={url}>{breadcrumbNameMap[url] || url}</Link>,
    };
  });

  const items = [
    {
      key: 'dashboard',
      title: <Link to="/dashboard">Dashboard</Link>,
    },
    ...breadcrumbItems.filter((item) => item.key !== '/dashboard'),
  ];

  return <Breadcrumb style={{ margin: '16px 0' }} items={items} />;
};

export default Breadcrumbs;
