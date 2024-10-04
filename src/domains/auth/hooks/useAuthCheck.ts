import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  checkAuthStatusRequest,
  clearInitialAuthCheck,
} from '../redux/reducers/authSlice';
import { useAppDispatch, useAppSelector } from 'src/app/redux/store';

const useAuthCheck = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, isAuthenticated, initialAuthCheck } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(clearInitialAuthCheck());
      await dispatch(checkAuthStatusRequest());
    };

    checkAuth();

    const interval = setInterval(() => {
      dispatch(checkAuthStatusRequest());
    }, 1000000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated && !initialAuthCheck) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate, initialAuthCheck]);

  return { loading, isAuthenticated, initialAuthCheck };
};

export default useAuthCheck;
