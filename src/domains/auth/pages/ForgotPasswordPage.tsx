import React, { useEffect, useState, useRef } from 'react';
import { UserOutlined } from '@ant-design/icons';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Form, Input, Button, message, Divider, Alert, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordRequest, clearStatus } from '../redux/authSlice';
import { RootState } from '@redux/store';
import AuthContainer from '../components/AuthContainer';
import AuthCard from '../components/AuthCard';
import CaptchaContainer from '@shared/components/CaptchaContainer';

const ForgotPasswordPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<any>(null);

  const { loading, error, success } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    document.title = 'Forgot Password';
  }, []);

  useEffect(() => {
    if (error) {
      message.error(error, 5);
      dispatch(clearStatus());

      if (captchaRef.current) {
        captchaRef.current.resetCaptcha();
      }

      form.setFieldsValue({ captchaToken: null });
      setCaptchaToken(null);
    }
  }, [error]);

  useEffect(() => {
    dispatch(clearStatus());

    return () => {
      dispatch(clearStatus());
    };
  }, [dispatch]);

  const onFinish = (values: { email: string; captchaToken: string }) => {
    dispatch(forgotPasswordRequest(values));
  };

  const handleCaptchaVerification = (token: string) => {
    setCaptchaToken(token);
    form.setFieldsValue({ captchaToken: token });
  };

  return (
    <AuthContainer>
      <AuthCard title="Recuperar Contraseña">
        <Form
          form={form}
          name="forgot_password_form"
          layout="vertical"
          onFinish={onFinish}
        >
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
            <Input
              disabled={success}
              prefix={<UserOutlined />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="captchaToken"
            valuePropName="captchaToken"
            rules={[
              {
                required: true,
                validator: () => {
                  return captchaToken
                    ? Promise.resolve()
                    : Promise.reject('Por favor completa el captcha');
                },
              },
            ]}
          >
            <CaptchaContainer>
              <HCaptcha
                ref={captchaRef}
                sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
                onVerify={handleCaptchaVerification}
                onExpire={() => form.setFieldsValue({ captchaToken: null })}
              />
            </CaptchaContainer>
          </Form.Item>
          <Form.Item>
            <Button
              disabled={success}
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              Recuperar Contraseña
            </Button>
          </Form.Item>
          <Form.Item>
            <Typography.Text type="secondary">
              Si no ves el email en tu buzón, consulta la carpeta de correo no
              deseado. Si no está allí, es posible que la dirección de email no
              esté confirmada o que no coincida con una cuenta existente.
            </Typography.Text>
          </Form.Item>
          {success && (
            <Form.Item>
              <Alert
                message="Hemos enviado un enlace para recuperar tu contraseña a tu email."
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

export default ForgotPasswordPage;
