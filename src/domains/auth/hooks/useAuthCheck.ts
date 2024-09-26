import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkAuthStatus } from '../redux/authSlice';
import { RootState } from '@redux/store';

const useAuthCheck = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(checkAuthStatus());

    const interval = setInterval(() => {
      dispatch(checkAuthStatus());
    }, 1100000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return { loading, isAuthenticated };
};

export default useAuthCheck;
