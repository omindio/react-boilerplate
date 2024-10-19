import apiClient from '@shared/api/apiClient';

export const forgotPassword = async (email: string, captchaToken: string) => {
  return apiClient.post('/auth/forgot-password', { email, captchaToken });
};

export const resetPassword = async (
  token: string,
  newPassword: string,
  confirmPassword: string,
  email: string
) => {
  return apiClient.post('/auth/reset-password', {
    token,
    newPassword,
    confirmPassword,
    email,
  });
};
