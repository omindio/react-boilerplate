import React, { useEffect } from 'react';
import { LockOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';

import AuthContainer from '../components/AuthContainer';
import AuthCard from '../components/AuthCard';

//TODO: Obtener el token de la URL
const ResetPasswordPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Reset Password';
  }, []);

  return (
    <AuthContainer>
      <AuthCard title="Cambiar Contraseña">
        <Form name="reset_password_form" layout="vertical">
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Por favor escribe tu contraseña' },
              {
                min: 6,
                message: 'La contraseña debe tener al menos 6 caracteres',
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
            name="confirmPassword"
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
      </AuthCard>
    </AuthContainer>
  );
};

export default ResetPasswordPage;
