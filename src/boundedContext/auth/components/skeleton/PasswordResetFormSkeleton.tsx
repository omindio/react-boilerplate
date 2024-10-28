import React from 'react';
import { Skeleton, Flex } from 'antd';

const PasswordResetFormSkeleton: React.FC = () => {
  return (
    <Flex gap="middle" vertical>
      <Skeleton.Input block={true} active />
      <Skeleton.Input block={true} active />
      <Skeleton.Button block={true} active />
      <Skeleton.Button block={true} active />
    </Flex>
  );
};

export default PasswordResetFormSkeleton;
