import React from 'react';
import { LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, Divider, Alert } from 'antd';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  resetPasswordRequest,
  clearStatus,
} from '../redux/reducers/forgotPasswordSlice';
import { useAppSelector, useAppDispatch } from 'src/app/redux/store';

import forgotPasswordReducer from '../redux/reducers/forgotPasswordSlice';
import forgotPasswordSaga from '../redux/sagas/forgotPasswordSaga';

import useStatusMessages from '@shared/hooks/useStatusMessages';
import WithReducerAndSaga from '@shared/hocs/WithReducerAndSaga';
import WithInjectionCheck from '@shared/hocs/WithInjectionCheck';
import ResetPasswordFormSkeleton from './skeleton/ResetPasswordFormSkeleton';

const ResetPasswordForm: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { token } = useParams();
  const params = new URLSearchParams(location.search);

  const email = params.get('email');

  const { loading } = useAppSelector((state) => state.forgotPassword);

  useStatusMessages({
    selector: (state) => state.forgotPassword,
    onClearStatus() {
      dispatch(clearStatus());
    },
  });

  const onFinish = (values: {
    token: string;
    newPassword: string;
    confirmPassword: string;
    email: string;
  }) => {
    dispatch(resetPasswordRequest(values));
  };

  return (
    <Form name="reset_password_form" layout="vertical" onFinish={onFinish}>
      <Form.Item name="token" initialValue={token} hidden>
        <Input />
      </Form.Item>
      <Form.Item name="email" initialValue={email} hidden>
        <Input />
      </Form.Item>
      <Form.Item
        name="newPassword"
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
              return Promise.reject(new Error('Las contraseñas no coinciden'));
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
        <Button type="primary" htmlType="submit" loading={loading} block>
          Guardar
        </Button>
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

const EnhancedForgotPasswordForm = WithInjectionCheck(ResetPasswordForm, {
  SkeletonComponent: () => <ResetPasswordFormSkeleton />,
});

export default WithReducerAndSaga({
  key: 'forgotPassword',
  reducer: forgotPasswordReducer,
  saga: forgotPasswordSaga,
  ejectKey: 'forgotPassword',
})((props) => (
  <EnhancedForgotPasswordForm {...props} isInjected={props.isInjected} />
));
