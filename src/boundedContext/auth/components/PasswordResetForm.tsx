import React, { useEffect } from 'react';
import { LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, Divider } from 'antd';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  resetPasswordRequest,
  clearStatus,
} from '../redux/reducers/passwordResetSlice';
import { useAppSelector, useAppDispatch } from 'src/app/redux/store';
import { WithFormInjectedProps } from 'src/app/redux/types/formInjectedProps';

import passwordResetReducer from '../redux/reducers/passwordResetSlice';
import passwordResetSaga from '../redux/sagas/passwordResetSaga';

import useStatusMessages from '@shared/hooks/useStatusMessages';
import WithReducerAndSaga from '@shared/hocs/WithReducerAndSaga';
import WithInjectionCheck from '@shared/hocs/WithInjectionCheck';
import PasswordResetFormSkeleton from './skeleton/PasswordResetFormSkeleton';
import { PasswordReset } from '../interfaces/passwordReset';
import WithForm from '@shared/hocs/WithForm';

const PasswordResetForm: React.FC<WithFormInjectedProps> = ({ form }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { token } = useParams();
  const params = new URLSearchParams(location.search);

  const email = params.get('email');

  const { loading, success } = useAppSelector((state) => state.passwordReset);

  useEffect(() => {
    if (success) {
      form.resetFields();
    }
  }, [success]);

  useStatusMessages({
    selector: (state) => state.passwordReset,
    onClearStatus() {
      dispatch(clearStatus());
    },
  });

  const onFinish = (values: PasswordReset) => {
    dispatch(resetPasswordRequest(values));
  };

  return (
    <Form
      form={form}
      name="reset_password_form"
      layout="vertical"
      onFinish={onFinish}
    >
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
              if (!value || getFieldValue('newPassword') === value) {
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

const EnhancedPasswordResetForm = WithForm(
  WithInjectionCheck(PasswordResetForm, {
    SkeletonComponent: () => <PasswordResetFormSkeleton />,
  })
);

export default WithReducerAndSaga({
  key: 'passwordReset',
  reducer: passwordResetReducer,
  saga: passwordResetSaga,
  ejectKey: 'passwordReset',
})((props) => (
  <EnhancedPasswordResetForm {...props} isInjected={props.isInjected} />
));
