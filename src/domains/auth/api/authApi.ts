import apiClient from '@shared/api/apiClient';

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  return apiClient.post('/auth/spa/login', credentials);
};

export const logout = () => {
  return apiClient.post('/auth/spa/logout', {});
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
