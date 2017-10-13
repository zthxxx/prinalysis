import axios from 'axios';
import { statusIntercept, requestErrorIntercept } from '@/api/wrapper';

axios.defaults.withCredentials = true;

export const setBaseUrl = base => {
  axios.defaults.baseURL = base;
};

axios.interceptors.response.use(
  statusIntercept,
  requestErrorIntercept
);

export const get = (url, params) => {
  return axios.get(url, { params });
};

export const post = (url, data) => {
  return axios.post(url, { data });
};
