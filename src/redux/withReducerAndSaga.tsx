import React, { useEffect } from 'react';
import { injectReducer, injectSaga, ejectSaga } from './store';

const withReducerAndSaga =
  (reducerKey: string, reducer: any, sagaKey: string, saga: any) =>
  <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const ReducerAndSagaInjector: React.FC<P> = (props) => {
      useEffect(() => {
        injectReducer(reducerKey, reducer);

        injectSaga(sagaKey, saga);

        return () => {
          ejectSaga(sagaKey);
        };
      }, [reducerKey, reducer, sagaKey, saga]);

      return <WrappedComponent {...props} />;
    };

    return ReducerAndSagaInjector;
  };

export default withReducerAndSaga;
