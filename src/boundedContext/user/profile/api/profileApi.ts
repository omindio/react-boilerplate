import apiClient from '@shared/api/apiClient';
import { PersonalData } from '../interfaces/PersonalData';

export const fetchPersonalData = async () => {
  return apiClient.get('/users/profile');
};

export const updatePersonalData = async (data: PersonalData) => {
  return apiClient.put('/users/profile', data);
};
