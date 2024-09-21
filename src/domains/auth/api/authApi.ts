import apiClient from '@shared/api/apiClient';

//TODO: Gestion de errores de autenticacion etc..
export const getCsrfToken = async () => await apiClient.get('/login/csrf-cookie');

export const loginUser = async (credentials: { username: string; password: string }) => {
  await getCsrfToken();

  return apiClient.post('/login', credentials);
};

export const logoutUser = () => {
  return apiClient.post('/logout', {});
};

export const checkAuthStatus = () => {
  return apiClient.get('/user');
}

export const renewSession = () => {
  return apiClient.get('/user');
}