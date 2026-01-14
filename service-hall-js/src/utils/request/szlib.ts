import axios, { AxiosInstance } from 'axios';
import jsonBigInt from 'json-bigint';

import { interceptorNilFilter } from './interceptors/null-filter';

function readBlobError(reader) {
  return new Promise(((resolve) => {
    // eslint-disable-next-line no-param-reassign
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        const err = new Error(data.errorMsg);
        Object.assign(err, {
          code: data.errorCode,
          response: { data },
        });
        resolve(err);
      } catch (error) {
        resolve(error);
      }
    };
  }));
}

export default ({
  baseURL, timeout, responseType, headers,
}): AxiosInstance => {
  const xhr = axios.create({
    baseURL,
    timeout: (Number.isFinite(timeout) ? timeout : 20 * 1000),
    responseType,
    headers: {
      ...headers,
    },
    transformResponse: [
      (data) => {
        try {
          return jsonBigInt({ storeAsString: true }).parse(data);
        } catch (error) {
          return data;
        }
      },
    ],
  });

  xhr.interceptors.request.use(
    interceptorNilFilter,
  );

  xhr.interceptors.response.use(
    async (response) => {
      const { data } = response;

      if (data instanceof Blob) {
        // Blob报错情况处理
        if (!data.type.includes('application/json')) {
          return response;
        }

        const reader = new FileReader();
        reader.readAsText(data);
        const error = await readBlobError(reader);
        throw error;
      }

      if (data.result !== 'success') {
        // 响应状态为失败则抛错
        const error = new Error(data.errorMsg);
        Object.assign(error, {
          code: data.errorCode,
          response,
        });

        throw error;
      }

      return data;
    },
  );

  return xhr;
};
