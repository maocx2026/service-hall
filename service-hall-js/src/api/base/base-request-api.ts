import { AxiosRequestConfig, ResponseType, RawAxiosRequestHeaders } from 'axios';

import createRequest from '@/utils/request/szlib';
import { errorInterceptor } from './error-interceptor';

export class BaseRequestApi {
  baseURL: string;

  responseType: ResponseType;

  headers: RawAxiosRequestHeaders;

  targetParams: { [key:string]: unknown } | Array<unknown>;

  targetData: { [key:string]: unknown } | Array<unknown>;

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  request: (args: AxiosRequestConfig) => any;

  constructor(args) {
    let baseURL;
    if ('baseURL' in args) {
      ({ baseURL } = args);
    }

    let timeout;
    if ('timeout' in args) {
      ({ timeout } = args);
    }

    let responseType;
    if ('responseType' in args) {
      ({ responseType } = args);
    }

    let headers;
    if ('headers' in args) {
      ({ headers } = args);
    }

    this.request = createRequest({
      baseURL,
      timeout,
      responseType,
      headers,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.request.interceptors.response.use(
      (response) => response,
      (error) => errorInterceptor(error),
    );

    this.targetParams = this.defaultParams();
    this.targetData = this.defaultData();
  }

  method() {
    return 'GET';
  }

  url() {
    return null;
  }

  defaultParams() {
    return {};
  }

  get params() {
    return this.targetParams;
  }

  set params(value) {
    this.targetParams = {
      ...this.defaultParams(),
      ...value,
    };
  }

  defaultData() {
    return {};
  }

  get data() {
    return this.targetData;
  }

  set data(value) {
    if (value instanceof FormData) {
      this.targetData = value;
      return;
    }

    if (Array.isArray(value)) {
      this.targetData = [
        ...[{ ...this.defaultData() }],
        ...value,
      ];
      return;
    }

    this.targetData = {
      ...this.defaultData(),
      ...value,
    };
  }

  send() {
    return this.request({
      method: this.method().toUpperCase(),
      data: this.targetData,
      url: this.url(),
      params: this.targetParams,
    });
  }
}
