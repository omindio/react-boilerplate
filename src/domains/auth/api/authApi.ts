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

export const forgotPassword = async (email: string, captchaToken: string) => {
  return apiClient.post('/auth/forgot-password', { email, captchaToken });
};

export const resetPassword = async (
  token: string,
  password: string,
  passwordConfirmation: string,
  email: string
) => {
  return apiClient.post('/auth/reset-password', {
    token,
    password,
    passwordConfirmation,
    email,
  });
};
