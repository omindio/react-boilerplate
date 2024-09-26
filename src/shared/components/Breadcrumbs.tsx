import React from 'react';
import styled from 'styled-components';
import { Breadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import breadcrumbNameMap from '../utils/breadcrumbMap';

const BreadcrumbStyled = styled(Breadcrumb)`
  padding: 15px 48px;
  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

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

  return <BreadcrumbStyled items={items} />;
};

export default Breadcrumbs;
