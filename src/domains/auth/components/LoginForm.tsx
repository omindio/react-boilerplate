import React, { useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from 'src/app/redux/store';
import { loginRequest, clearStatus } from '../redux/reducers/authSlice';

import useStatusMessages from '@shared/hooks/useStatusMessages';

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);

  useStatusMessages({
    selector: (state) => state.auth,
    onClearStatus() {
      dispatch(clearStatus());
    },
  });

  useEffect(() => {
    dispatch(clearStatus());
    return () => {
      dispatch(clearStatus());
    };
  }, [dispatch]);

  const onFinish = (values: { email: string; password: string }) => {
    dispatch(loginRequest(values));
  };

  return (
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
        rules={[{ required: true, message: 'Por favor escribe tu contraseña' }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Iniciar Sesión
        </Button>
      </Form.Item>
      <Divider>o</Divider>
      <Form.Item>
        <Button block onClick={() => navigate('/forgot-password')}>
          Recuperar la contraseña
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
