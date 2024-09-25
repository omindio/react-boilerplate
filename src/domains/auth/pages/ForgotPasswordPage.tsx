import React, { useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

import AuthContainer from '../components/AuthContainer';
import AuthCard from '../components/AuthCard';

const ForgotPasswordPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Forgot Password';
  }, []);

  return (
    <AuthContainer>
      <AuthCard title="Recuperar Contraseña">
        <Form name="forgot_password_form" layout="vertical">
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Por favor escribe tu email',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Recuperar Contraseña
            </Button>
          </Form.Item>
          <Form.Item>
            <Link to="/login">Iniciar Sesión</Link>
          </Form.Item>
        </Form>
      </AuthCard>
    </AuthContainer>
  );
};

export default ForgotPasswordPage;
