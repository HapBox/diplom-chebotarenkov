import axios from 'axios';

const netClient = axios.create({
  baseURL: 'http://localhost:3100/api/v1',
  timeout: 10000,
});

netClient.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      //@ts-ignore
      request.headers = {
        'Content-Type': 'application/json',
        'x-access-token': accessToken,
      };
    }
    return request;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

netClient.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default netClient;
