import React, { useEffect, useState } from 'react';
import {
  injectReducer,
  ejectReducer,
  injectSaga,
  ejectSaga,
} from '../injectors';

interface WithReducerAndSagaProps {
  key: string;
  reducer: any;
  saga: () => any;
  ejectKey?: string;
}

const WithReducerAndSaga =
  ({ key, reducer, saga, ejectKey }: WithReducerAndSagaProps) =>
  (WrappedComponent: React.ComponentType<any>) => {
    const EnhancedComponent = (props: any) => {
      const [isInjected, setIsInjected] = useState(false);

      useEffect(() => {
        injectReducer(key, reducer);
        injectSaga(key, saga);

        setIsInjected(true);
        return () => {
          if (ejectKey) {
            ejectReducer(ejectKey);
          }
          ejectSaga(key);
        };
      }, [key, reducer, saga, ejectKey]);

      return <WrappedComponent {...props} isInjected={isInjected} />;
    };

    return EnhancedComponent;
  };

export default WithReducerAndSaga;
