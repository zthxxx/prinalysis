// https://github.com/axios/axios
import axios from 'axios';
import { statusIntercept, requestErrorIntercept } from '@/api/wrapper';
export { post } from 'axios';

axios.defaults.withCredentials = true;

export const setBaseUrl = base => {
  axios.defaults.baseURL = base;
};

axios.interceptors.response.use(
  statusIntercept,
  requestErrorIntercept
);

export const get = (url, params, ...config) => axios.get(url, { ...config, params });
