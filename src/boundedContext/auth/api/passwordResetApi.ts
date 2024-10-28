import apiClient from '@shared/api/apiClient';
import { RequestPasswordReset } from '../interfaces/requestPasswordReset';
import { PasswordReset } from '../interfaces/passwordReset';

export const requestPasswordReset = async (data: RequestPasswordReset) => {
  return apiClient.post('/auth/password/request', data);
};

export const passwordReset = async (data: PasswordReset) => {
  return apiClient.post('/auth/password/reset', data);
};
