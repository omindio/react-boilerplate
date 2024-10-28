import React, { useEffect, useState, useRef } from 'react';
import { UserOutlined } from '@ant-design/icons';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Form, Input, Button, Divider, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import passwordResetReducer from '../redux/reducers/passwordResetSlice';
import passwordResetSaga from '../redux/sagas/passwordResetSaga';
import { useAppSelector, useAppDispatch } from 'src/app/redux/store';
import {
  passwordResetRequest,
  clearStatus,
} from '../redux/reducers/passwordResetSlice';

import CaptchaContainer from '@shared/components/CaptchaContainer';
import useStatusMessages from '@shared/hooks/useStatusMessages';

import WithReducerAndSaga from '@shared/hocs/WithReducerAndSaga';
import WithInjectionCheck from '@shared/hocs/WithInjectionCheck';
import RequestPasswordResetFormSkeleton from './skeleton/RequestPasswordResetFormSkeleton';
import { RequestPasswordReset } from '../interfaces/requestPasswordReset';

const RequestPasswordResetForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<any>(null);

  const { loading, error, success } = useAppSelector(
    (state) => state.passwordReset
  );

  useStatusMessages({
    selector: (state) => state.passwordReset,
    onClearStatus() {
      dispatch(clearStatus());
    },
  });

  useEffect(() => {
    if (error || success) {
      if (captchaRef.current) {
        captchaRef.current.resetCaptcha();
      }

      form.setFieldsValue({ captchaToken: null });
      setCaptchaToken(null);
    }
  }, [error, success]);

  const onFinish = (values: RequestPasswordReset) => {
    dispatch(passwordResetRequest(values));
  };

  const handleCaptchaVerification = (token: string) => {
    setCaptchaToken(token);
    form.setFieldsValue({ captchaToken: token });
  };

  return (
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
        <Input prefix={<UserOutlined />} placeholder="Email" />
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
        <Button type="primary" htmlType="submit" block loading={loading}>
          Recuperar Contraseña
        </Button>
      </Form.Item>
      <Form.Item>
        <Typography.Text type="secondary">
          Si no ves el email en tu buzón, consulta la carpeta de correo no
          deseado. Si no está allí, es posible que la dirección de email no esté
          confirmada o que no coincida con una cuenta existente.
        </Typography.Text>
      </Form.Item>
      <Divider>o</Divider>
      <Form.Item>
        <Button block onClick={() => navigate('/login')}>
          Iniciar Sesión
        </Button>
      </Form.Item>
    </Form>
  );
};

const EnhancedRequestPasswordResetForm = WithInjectionCheck(
  RequestPasswordResetForm,
  {
    SkeletonComponent: () => <RequestPasswordResetFormSkeleton />,
  }
);

export default WithReducerAndSaga({
  key: 'passwordReset',
  reducer: passwordResetReducer,
  saga: passwordResetSaga,
  ejectKey: 'passwordReset',
})((props) => (
  <EnhancedRequestPasswordResetForm {...props} isInjected={props.isInjected} />
));
