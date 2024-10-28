import apiClient from '@shared/api/apiClient';

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  return apiClient.post('/auth/session/login', credentials);
};

export const logout = async () => {
  return apiClient.post('/auth/session/logout');
};

export const checkAuthStatus = async () => {
  return apiClient.get('/auth/user');
};
