import React from 'react';
import { Form } from 'antd';

const WithForm = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const [form] = Form.useForm();
    return <WrappedComponent {...props} form={form} />;
  };
};

export default WithForm;
