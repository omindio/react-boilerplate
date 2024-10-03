import React from 'react';
import { Skeleton, Flex } from 'antd';

const UpdatePersonalDataFormSkeleton: React.FC = () => {
  return (
    <Flex gap="middle" vertical>
      <Skeleton paragraph={{ rows: 2 }} active />
      <Skeleton.Input block={true} active />
      <Skeleton.Button block={true} active />
    </Flex>
  );
};

export default UpdatePersonalDataFormSkeleton;
