import React from 'react';
import { WithInjectedProps } from '@redux/types/injectedProps';

interface WithInjectionCheckProps {
  SkeletonComponent: React.ComponentType;
}

const WithInjectionCheck = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  { SkeletonComponent }: WithInjectionCheckProps
) => {
  return (props: P & WithInjectedProps) => {
    const { isInjected } = props;

    if (!isInjected) {
      return <SkeletonComponent />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default WithInjectionCheck;
