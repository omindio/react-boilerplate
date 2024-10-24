import apiClient from '@shared/api/apiClient';

export const passwordReset = async (email: string, captchaToken: string) => {
  return apiClient.post('/auth/password/request', { email, captchaToken });
};

export const resetPassword = async (
  token: string,
  newPassword: string,
  confirmPassword: string,
  email: string
) => {
  return apiClient.post('/auth/password/reset', {
    token,
    newPassword,
    confirmPassword,
    email,
  });
};
