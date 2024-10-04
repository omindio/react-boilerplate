import React, { useEffect, useState } from 'react';
import { FormInstance } from 'antd';
import { useAppDispatch, useAppSelector } from '@redux/store';
import useInitialFormValues from '@shared/hooks/useInitialFormValues';

interface WithFormHandlingProps {
  fetchRequestAction: () => void;
  selector: (state: any) => any;
  SkeletonComponent: React.FC;
}

const WithFormHandling = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  { fetchRequestAction, selector, SkeletonComponent }: WithFormHandlingProps
) => {
  return (props: P & { isInjected: boolean; form: FormInstance }) => {
    const { isInjected, form } = props;
    const dispatch = useAppDispatch();
    const data = useAppSelector(selector);
    const [initialFetchDone, setInitialFetchDone] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
      if (isInjected && !initialFetchDone) {
        dispatch(fetchRequestAction() as any);
        setInitialFetchDone(true);
      }
    }, [dispatch, isInjected]);

    useEffect(() => {
      if (initialFetchDone && !data?.loading) {
        setInitialLoading(false);
      }
    }, [data?.loading, initialFetchDone]);

    const { loaded } = useInitialFormValues({
      form,
      isInjected,
      data,
    });

    if (initialLoading || !isInjected || !loaded) {
      return <SkeletonComponent />;
    }

    return <WrappedComponent {...props} form={form} data={data} />;
  };
};

export default WithFormHandling;
