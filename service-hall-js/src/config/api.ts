import { PUBLIC_PATH } from './public-path';

// api接口
export const LOCAL_SZLIB_WX_API_BASE_URL = `${PUBLIC_PATH}x-szlib-wx-api`;
export const LOCAL_OPAC_API_BASE_URL = `${PUBLIC_PATH}x-szlib-opac-api`;

// 接口日期格式
export const ApiDateFormat = Object.freeze({
  DATE_TIME: "yyyy-MM-dd'T'HH:mm:ssxxx",
  DATE: 'yyyy-MM-dd',
  REMOTE_DATE_TIME: 'yyyy-MM-dd HH:mm:ss',
  hourMinute: 'HH:mm',
});

// 接口所在服务器时区
export const API_SERVER_TIME_ZONE = 'Asia/Shanghai';
