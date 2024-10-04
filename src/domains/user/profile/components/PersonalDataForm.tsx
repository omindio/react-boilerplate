import React from 'react';
import { useAppSelector, useAppDispatch } from '@redux/store';
import { Form, Input, Button, Typography, Space } from 'antd';
import {
  fetchPersonalDataRequest,
  updatePersonalDataRequest,
} from '../redux/reducers/personalDataSlice';
import personalDataReducer from '../redux/reducers/personalDataSlice';
import personalDataWatcherSaga from '../redux/sagas/personalDataSaga';
import WithReducerAndSaga from '@redux/components/WithReducerAndSaga';
import { WithFormInjectedProps } from '@redux/types/formInjectedProps';
import UpdatePersonalDataFormSkeleton from './PersonalDataFormSkeleton';
import WithFormHandling from '@shared/components/WithFormHandling';
import WithForm from '@shared/components/WithForm';
import useStatusMessages from '@shared/hooks/useStatusMessages';

const UpdatePersonalDataForm: React.FC<WithFormInjectedProps> = ({ form }) => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.personalData);

  useStatusMessages({ selector: (state) => state.personalData });

  const onFinish = (values: { name: string }) => {
    dispatch(updatePersonalDataRequest(values));
  };

  return (
    <Space direction="vertical" size="large">
      <Typography.Text>
        Actualiza tu información personal en cualquier momento.
      </Typography.Text>
      <Form
        name="personal_data_password_form"
        layout="vertical"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          name="name"
          label="Nombre"
          rules={[
            {
              required: true,
              message: 'Por favor escribe tu nombre',
              min: 3,
            },
          ]}
        >
          <Input placeholder="Introduce tu nombre" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

const EnhancedUpdatePersonalDataForm = WithForm(
  WithFormHandling(UpdatePersonalDataForm, {
    fetchRequestAction: fetchPersonalDataRequest,
    selector: (state) => state.personalData,
    SkeletonComponent: UpdatePersonalDataFormSkeleton,
  })
);

export default WithReducerAndSaga({
  key: 'personalData',
  reducer: personalDataReducer,
  saga: personalDataWatcherSaga,
  ejectKey: 'personalData',
})((props) => (
  <EnhancedUpdatePersonalDataForm {...props} isInjected={props.isInjected} />
));
