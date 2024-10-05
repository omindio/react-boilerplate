import { useEffect } from 'react';
import { useAppSelector } from 'src/app/redux/store';
import { useAntd } from '@shared/contexts/AntdContext';

interface UseStatusMessagesProps {
  selector: (state: any) => any;
  time?: number;
  onClearStatus?: () => void;
}

const useStatusMessages = ({
  selector,
  time = 7,
  onClearStatus,
}: UseStatusMessagesProps) => {
  const { success, error } = useAppSelector(selector);
  const { message } = useAntd();

  useEffect(() => {
    if (success) {
      message.success(success, time);
      if (onClearStatus) {
        onClearStatus();
      }
    }
    if (error) {
      message.error(error, time);
      if (onClearStatus) {
        onClearStatus();
      }
    }
  }, [success, error, time, onClearStatus]);
};

export default useStatusMessages;
