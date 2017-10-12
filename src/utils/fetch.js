import 'whatwg-fetch';
import qs from 'querystring';

// 缺省请求头
const defaultHeaders = {
  'Accept': 'application/json',
  // application/json application/x-www-form-urlencoded
  'Content-Type': 'application/json'
};

// 请求参数加工
// options see https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
function mutate (url, { headers, body, query, ...options }) {
  headers = { ...defaultHeaders, ...headers };
  options.headers = headers;

  if (body) {
    if (typeof body === 'object') {
      body = JSON.stringify(body);
    }
    options.body = body;
  }

  if (query) {
    if (typeof query === 'object') {
      query = qs.stringify(query);
    }
    url += url.includes('?') ? '&' : '?';
    url += query;
  }

  // with 'include', Access-Control-Allow-Origin must be <origin> instead of '*'
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Credentialed_requests_and_wildcards
  // omit, same-origin, include
  options.credentials = 'include';
  // "same-origin", "cors", "no-cors", "navigate", or "websocket"
  options.mode = 'cors';

  return [url, options];
}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON (response) {
  return response.json();
}

/**
 * 接口调用服务
 * @param {String} url 接口API（必填）
 * @param {Object} options 请求参数（选填）{headers, body, query, ...options}
 * @return {Object} Promise
 * @throws {Error}
 */
const callService = (url, options = {}) => {
  return window.fetch(...mutate(url, options))
    .then(checkStatus)
    .then(parseJSON)
    .catch(error => {
      console.error(error);
      return {
        result: 'ERROR',
        message: '链接请求出现异常，请检查您的网络设置。'
      };
    });
};

export const get = (url, args, options = {}) => {
  options.method = 'GET';
  options.query = args;
  return callService(url, options);
};

export const post = (url, args, options = {}) => {
  options.method = 'POST';
  options.body = args;
  return callService(url, options);
};

export const paramPost = (url, args, options = {}) => {
  if (args instanceof Object) {
    args = `param=${JSON.stringify(args)}`;
  }
  return post(url, args, options);
};

export const put = (url, args, options = {}) => {
  options.method = 'PUT';
  options.body = args;
  return callService(url, options);
};

export const patch = (url, args, options = {}) => {
  options.method = 'PATCH';
  options.body = args;
  return callService(url, options);
};

export const del = (url, args, options = {}) => {
  options.method = 'DELETE';
  options.query = args;
  return callService(url, options);
};

export default { get, post, paramPost, put, patch, del };
