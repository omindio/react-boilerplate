import React from 'react';
import { Skeleton, Flex } from 'antd';

const ChangePasswordFormSkeleton: React.FC = () => {
  return (
    <Flex gap="middle" vertical>
      <Skeleton paragraph={{ rows: 2 }} active />
      <Skeleton.Input block={true} active />
      <Skeleton.Input block={true} active />
      <Skeleton.Input block={true} active />
      <Skeleton.Button block={true} active />
      <Skeleton paragraph={{ rows: 2 }} active />
    </Flex>
  );
};

export default ChangePasswordFormSkeleton;
