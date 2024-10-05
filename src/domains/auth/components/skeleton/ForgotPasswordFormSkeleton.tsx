import React from 'react';
import { Skeleton, Flex } from 'antd';

const ForgotPasswordFormSkeleton: React.FC = () => {
  return (
    <Flex gap="middle" vertical>
      <Skeleton.Input block={true} active />
      <Skeleton.Input block={true} active />
      <Skeleton.Button block={true} active />
      <Skeleton paragraph={{ rows: 4 }} active />
      <Skeleton.Button block={true} active />
    </Flex>
  );
};

export default ForgotPasswordFormSkeleton;
