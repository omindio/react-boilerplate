import React, { useEffect } from 'react';
import { LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, Divider, message, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { resetPasswordRequest, clearStatus } from '../redux/authSlice';
import { RootState } from '@redux/store';

import AuthContainer from '../components/AuthContainer';
import AuthCard from '../components/AuthCard';

const ResetPasswordPage: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();
  const params = new URLSearchParams(location.search);

  const email = params.get('email');

  const { loading, error, success } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    document.title = 'Reset Password';
  }, []);

  useEffect(() => {
    if (error) {
      message.error(error, 5);
      dispatch(clearStatus());
    }
  }, [error]);

  useEffect(() => {
    dispatch(clearStatus());

    return () => {
      dispatch(clearStatus());
    };
  }, [dispatch]);

  const onFinish = (values: {
    token: string;
    password: string;
    passwordConfirmation: string;
    email: string;
  }) => {
    dispatch(resetPasswordRequest(values));
  };

  return (
    <AuthContainer>
      <AuthCard title="Cambiar Contraseña">
        <Form name="reset_password_form" layout="vertical" onFinish={onFinish}>
          <Form.Item name="token" initialValue={token} hidden>
            <Input />
          </Form.Item>
          <Form.Item name="email" initialValue={email} hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Por favor escribe tu contraseña' },
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
              disabled={success}
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
              disabled={success}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              disabled={success}
            >
              Guardar
            </Button>
          </Form.Item>
          {success && (
            <Form.Item>
              <Alert
                message="La contraseña ha sido cambiada correctamente. Vuelve a iniciar sesión."
                type="success"
                showIcon
              />
            </Form.Item>
          )}
          <Divider>o</Divider>
          <Form.Item>
            <Button block onClick={() => navigate('/login')}>
              Iniciar Sesión
            </Button>
          </Form.Item>
        </Form>
      </AuthCard>
    </AuthContainer>
  );
};

export default ResetPasswordPage;
