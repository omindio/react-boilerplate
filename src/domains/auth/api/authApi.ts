import apiClient from '@shared/api/apiClient';

export const getCsrfToken = async () => await apiClient.get('/csrf-cookie');

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  await getCsrfToken();

  return apiClient.post('/auth/spa-login', credentials);
};

export const logoutUser = () => {
  return apiClient.post('/auth/spa-logout', {});
};

export const checkAuthStatus = () => {
  return apiClient.get('/auth/user');
};

export const renewSession = () => {
  return apiClient.get('/auth/user');
};

export const requestPasswordRecovery = (email: string) => {
  return apiClient.post('/auth/recover-password', { email });
};

export const updatePassword = (token: string, newPassword: string) => {
  return apiClient.post('/auth/update-password', { token, newPassword });
};
