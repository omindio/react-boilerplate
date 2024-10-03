import apiClient from '@shared/api/apiClient';

export const fetchPersonalData = async () => {
  return apiClient.get('/users/profile');
};

export const updatePersonalData = async (data: { name: string }) => {
  return apiClient.put('/users/profile', data);
};
