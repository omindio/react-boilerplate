import React, { useState, Suspense } from 'react';
import AdminLayout from '@shared/layouts/AdminLayout';
import { Tabs, Row, Col, Typography } from 'antd';
import type { TabsProps } from 'antd';
import PasswordFormSkeleton from '../components/skeleton/PasswordFormSkeleton';
import PersonalDataFormSkeleton from '../components/skeleton/PasswordFormSkeleton';

const PasswordForm = React.lazy(() => import('../components/PasswordForm'));

const PersonalDataForm = React.lazy(
  () => import('../components/PersonalDataForm')
);

const { Title } = Typography;

const ProfilePage: React.FC = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>(() => {
    return localStorage.getItem('profilePageActiveTabKey') || '1';
  });

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Datos Personales',
      children: (
        <Row>
          <Col xs={24} sm={12} md={6} xl={4}>
            <Suspense fallback={<PersonalDataFormSkeleton />}>
              <PersonalDataForm />
            </Suspense>
          </Col>
        </Row>
      ),
    },
    {
      key: '2',
      label: 'Cambiar Contraseña',
      children: (
        <Row>
          <Col xs={24} sm={12} md={6} xl={4}>
            <Suspense fallback={<PasswordFormSkeleton />}>
              <PasswordForm />
            </Suspense>
          </Col>
        </Row>
      ),
    },
  ];

  const handleTabChange = (key: string) => {
    setActiveTabKey(key);
    localStorage.setItem('profilePageActiveTabKey', key); // Guardar la pestaña activa en localStorage
  };

  return (
    <AdminLayout metaTitle="Profile">
      <Title level={2}>Editar Perfil</Title>
      <Tabs
        activeKey={activeTabKey}
        onChange={handleTabChange}
        defaultActiveKey="1"
        items={items}
        tabPosition="top"
      />
    </AdminLayout>
  );
};

export default ProfilePage;
