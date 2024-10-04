import { useEffect, useState } from 'react';
import { FormInstance } from 'antd';

interface UseInitialFormValuesProps<T> {
  form: FormInstance;
  isInjected: boolean;
  data: T | null;
}

interface DataWithLoading {
  loading: boolean;
}

const useInitialFormValues = <T extends DataWithLoading>({
  form,
  isInjected,
  data,
}: UseInitialFormValuesProps<T>) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isInjected && data && !data.loading) {
      form.setFieldsValue(data);
      setLoaded(true);
    }
  }, [form, isInjected, data]);

  return { loaded };
};

export default useInitialFormValues;
