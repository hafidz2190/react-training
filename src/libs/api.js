import axios from 'axios';

export const callRestApi = async (method, url, route, data, params, responseType) => {
  const response = await axios({
    method,
    url: `${url}/${route}`,
    data,
    params,
    responseType,
  });

  console.group('axios');
  console.log('host', url);
  console.log('route', route);
  console.log('method', method);
  console.log('data', data);
  console.log('params', params);
  console.log('responseType', responseType);
  console.log('response', response.data);
  console.groupEnd();

  return response.data;
};

export default callRestApi;
