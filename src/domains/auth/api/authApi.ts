import apiClient from '@shared/api/apiClient';

export const loginUser = (credentials: { username: string; password: string }) => {
  return apiClient.post('/login', credentials, {
    withCredentials: true,
  });
};

export const logoutUser = () => {
  return apiClient.post('/logout', {}, {
    withCredentials: true,
  });
};