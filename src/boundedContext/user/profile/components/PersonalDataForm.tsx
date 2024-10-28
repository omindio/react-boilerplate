import React from 'react';
import { useAppSelector, useAppDispatch } from 'src/app/redux/store';
import { Form, Input, Button, Typography, Space } from 'antd';
import {
  fetchPersonalDataRequest,
  updatePersonalDataRequest,
} from '../redux/reducers/personalDataSlice';
import personalDataReducer from '../redux/reducers/personalDataSlice';
import personalDataWatcherSaga from '../redux/sagas/personalDataSaga';
import WithReducerAndSaga from '@shared/hocs/WithReducerAndSaga';
import { WithFormInjectedProps } from 'src/app/redux/types/formInjectedProps';
import UpdatePersonalDataFormSkeleton from './skeleton/PersonalDataFormSkeleton';
import WithFormHandling from '@shared/hocs/WithFormHandling';
import WithForm from '@shared/hocs/WithForm';
import useStatusMessages from '@shared/hooks/useStatusMessages';
import { PersonalData } from '../interfaces/personalData';

const UpdatePersonalDataForm: React.FC<WithFormInjectedProps> = ({ form }) => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.personalData);

  useStatusMessages({ selector: (state) => state.personalData });

  const onFinish = (values: PersonalData) => {
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
        <Form.Item
          name="surname"
          label="Apellido"
          rules={[
            {
              required: true,
              message: 'Por favor escribe tu apellido',
              min: 3,
            },
          ]}
        >
          <Input placeholder="Introduce tu apellido" />
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
