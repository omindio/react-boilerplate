import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isFetchingCsrfToken = false;

const getCsrfToken = async () => {
  if (!isFetchingCsrfToken) {
    isFetchingCsrfToken = true;
    try {
      await apiClient.get('/csrf-cookie');
    } finally {
      isFetchingCsrfToken = false;
    }
  }
};

apiClient.interceptors.request.use(
  async (config) => {
    let token = Cookies.get('XSRF-TOKEN');

    if (!token) {
      await getCsrfToken();
      token = Cookies.get('XSRF-TOKEN');
    }
    if (token) {
      config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
