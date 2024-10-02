import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkAuthStatus, clearInitialAuthCheck } from '../redux/authSlice';
import { RootState } from '@redux/store';

const useAuthCheck = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthenticated, initialAuthCheck } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(clearInitialAuthCheck());
      await dispatch(checkAuthStatus());
    };

    checkAuth();

    const interval = setInterval(() => {
      dispatch(checkAuthStatus());
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
