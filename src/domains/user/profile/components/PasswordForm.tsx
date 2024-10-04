import React from 'react';
import { LockOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'src/app/redux/store';
import { Form, Input, Button, Typography, Space } from 'antd';

const UpdatePasswordForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const onFinish = (values: {
    token: string;
    password: string;
    passwordConfirmation: string;
    email: string;
  }) => {
    // dispatch(resetPasswordRequest(values));
  };

  return (
    <Space direction="vertical" size="large">
      <Typography.Text>
        Crea una contraseña nueva que tenga al menos 8 caracteres.
      </Typography.Text>
      <Form name="change_password_form" layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="currentPassword"
          rules={[
            {
              required: true,
              message: 'Por favor escribe tu contraseña',
            },
            {
              min: 8,
              message: 'La contraseña debe tener al menos 8 caracteres',
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Contraseña Actual"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Por favor escribe tu contraseña',
            },
            {
              min: 8,
              message: 'La contraseña debe tener al menos 8 caracteres',
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Nueva Contraseña"
          />
        </Form.Item>
        <Form.Item
          name="passwordConfirmation"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Por favor repite tu nueva contraseña',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Las contraseñas no coinciden')
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Repite tu nueva contraseña"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Guardar
          </Button>
        </Form.Item>
      </Form>
      <Typography.Text type="secondary">
        <strong>¿Has olvidado tu contraseña?</strong> Puedes cerrar sesión y
        acceder a la página de Recuperar tu contraseña desde el Login.
      </Typography.Text>
    </Space>
  );
};

export default UpdatePasswordForm;
