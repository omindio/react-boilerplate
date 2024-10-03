import React, { useEffect, useState } from 'react';
import {
  injectReducer,
  ejectReducer,
  injectSaga,
  ejectSaga,
} from '../injectors';

const withReducerAndSaga =
  ({
    key,
    reducer,
    saga,
    ejectKey,
  }: {
    key: string;
    reducer: any;
    saga: any;
    ejectKey?: string;
  }) =>
  (WrappedComponent: React.ComponentType<any>) => {
    const EnhancedComponent = (props: any) => {
      const [isInjected, setIsInjected] = useState(false);

      useEffect(() => {
        injectReducer(key, reducer);
        const sagaTask = injectSaga(key, saga);

        sagaTask?.toPromise().then(() => {
          setIsInjected(true);
        });

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

export default withReducerAndSaga;
