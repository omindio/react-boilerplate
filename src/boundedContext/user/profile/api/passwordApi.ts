import apiClient from '@shared/api/apiClient';
import { Password } from '../interfaces/password';

export const updatePassword = async (data: Password) => {
  return apiClient.put('/users/password', data);
};
