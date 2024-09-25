import React, { useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { loginRequest } from '../redux/authSlice';

import AuthContainer from '../components/AuthContainer';
import AuthCard from '../components/AuthCard';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    document.title = 'Login';
  }, []);

  useEffect(() => {
    if (error) {
      message.error(error, 5);
    }
  }, [error]);

  const onFinish = (values: { email: string; password: string }) => {
    dispatch(loginRequest(values));
  };

  return (
    <AuthContainer>
      <AuthCard title="Iniciar Sesión">
        <Form name="login_form" layout="vertical" onFinish={onFinish}>
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

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Por favor escribe tu contraseña' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Contraseña"
            />
          </Form.Item>

          <Form.Item>
            <Link to="/forgot-password" style={{ float: 'right' }}>
              Recuperar la contraseña
            </Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Iniciar Sesión
            </Button>
          </Form.Item>
        </Form>
      </AuthCard>
    </AuthContainer>
  );
};

export default LoginPage;
