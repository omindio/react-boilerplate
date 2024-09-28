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

export const checkAuthStatus = async () => {
  await getCsrfToken();
  return apiClient.get('/auth/user');
};

export const forgotPassword = async (email: string, captchaToken: string) => {
  await getCsrfToken();
  return apiClient.post('/auth/forgot-password', { email, captchaToken });
};

export const resetPassword = async (
  token: string,
  password: string,
  passwordConfirmation: string,
  email: string
) => {
  await getCsrfToken();
  return apiClient.post('/auth/reset-password', {
    token,
    password,
    password_confirmation: passwordConfirmation,
    email,
  });
};
