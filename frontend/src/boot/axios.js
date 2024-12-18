import axios from 'axios';
import { LocalStorage } from 'quasar';

export default ({ app, router, Vue }) => {
  const token = LocalStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        router.push('/login');
      }
      return Promise.reject(error);
    }
  );

  Vue.prototype.$axios = axios;
};
