import { useEffect } from 'react';
import { useAppSelector } from '@redux/store';
import { message } from 'antd';

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
