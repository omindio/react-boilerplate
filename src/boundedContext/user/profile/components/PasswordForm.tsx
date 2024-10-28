import React, { useEffect } from 'react';
import { LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, Typography, Space } from 'antd';

import { passwordRequest, clearStatus } from '../redux/reducers/passwordSlice';
import { useAppSelector, useAppDispatch } from 'src/app/redux/store';

import passwordReducer from '../redux/reducers/passwordSlice';
import passwordSaga from '../redux/sagas/passwordSaga';
import { WithFormInjectedProps } from 'src/app/redux/types/formInjectedProps';

import useStatusMessages from '@shared/hooks/useStatusMessages';
import WithReducerAndSaga from '@shared/hocs/WithReducerAndSaga';
import WithInjectionCheck from '@shared/hocs/WithInjectionCheck';
import PasswordFormSkeleton from './skeleton/PasswordFormSkeleton';
import { Password } from '../interfaces/password';
import WithForm from '@shared/hocs/WithForm';

const PasswordForm: React.FC<WithFormInjectedProps> = ({ form }) => {
  const dispatch = useAppDispatch();

  const { loading, success } = useAppSelector((state) => state.password);

  useEffect(() => {
    if (success) {
      form.resetFields();
    }
  }, [success]);

  useStatusMessages({
    selector: (state) => state.password,
    onClearStatus() {
      dispatch(clearStatus());
    },
  });

  const onFinish = (values: Password) => {
    dispatch(passwordRequest(values));
  };

  return (
    <Space direction="vertical" size="large">
      <Typography.Text>
        Crea una contraseña nueva que tenga al menos 8 caracteres.
      </Typography.Text>
      <Form
        form={form}
        name="change_password_form"
        layout="vertical"
        onFinish={onFinish}
      >
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
          name="newPassword"
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
          <Button loading={loading} type="primary" htmlType="submit" block>
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

const EnhancedPasswordForm = WithForm(
  WithInjectionCheck(PasswordForm, {
    SkeletonComponent: () => <PasswordFormSkeleton />,
  })
);

export default WithReducerAndSaga({
  key: 'password',
  reducer: passwordReducer,
  saga: passwordSaga,
  ejectKey: 'password',
})((props) => (
  <EnhancedPasswordForm {...props} isInjected={props.isInjected} />
));
