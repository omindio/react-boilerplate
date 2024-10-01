import React from 'react';
import AdminLayout from '@shared/layouts/AdminLayout';
import {
  Form,
  Input,
  Button,
  message,
  Divider,
  Alert,
  Tabs,
  Typography,
} from 'antd';

const ProfilePage: React.FC = () => {
  return (
    <AdminLayout metaTitle="Profile">
      <Typography.Title level={2}>Editar Perfil</Typography.Title>
      <Tabs defaultActiveKey="1" tabPosition="left">
        <Tabs.TabPane tab="Datos Personales" key="1">
          Nombre
        </Tabs.TabPane>
        <Tabs.TabPane tab="Cambiar Contraseña" key="2">
          Cambiar
        </Tabs.TabPane>
      </Tabs>
    </AdminLayout>
  );
};

export default ProfilePage;
