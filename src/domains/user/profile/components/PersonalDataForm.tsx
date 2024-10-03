import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@redux/store';
import { Form, Input, Button, Typography, Space } from 'antd';
import {
  fetchPersonalDataRequest,
  updatePersonalDataRequest,
} from '../redux/reducers/personalDataSlice';
import personalDataReducer from '../redux/reducers/personalDataSlice';
import personalDataWatcherSaga from '../redux/sagas/personalDataSaga';
import withReducerAndSaga from '@redux/components/WithReducerAndSaga';
import { WithInjectedProps } from '@redux/types/injectedProps';

const UpdatePersonalDataForm: React.FC<WithInjectedProps> = ({
  isInjected,
}) => {
  const dispatch = useAppDispatch();

  const personalData = useAppSelector((state) => state.personalData);

  useEffect(() => {
    if (isInjected) {
      dispatch(fetchPersonalDataRequest());
    }
  }, [dispatch, isInjected]);

  if (!isInjected) {
    return <div>cargando...</div>;
  }

  /*
  if (!personalData) {
    return <div>Cargando datos...</div>;
  }
  */

  const { name, loading } = personalData;

  const onFinish = (values: { name: string }) => {
    //dispatch(updatePersonalDataRequest(values));
    //dispatch(fetchPersonalDataRequest());
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
        initialValues={{ name }}
      >
        <Form.Item
          name="name"
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

export default withReducerAndSaga({
  key: 'personalData',
  reducer: personalDataReducer,
  saga: personalDataWatcherSaga,
  ejectKey: 'personalData',
})(UpdatePersonalDataForm);
