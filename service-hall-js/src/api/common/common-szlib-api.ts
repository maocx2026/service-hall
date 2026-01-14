import { LOCAL_SZLIB_WX_API_BASE_URL } from '@/config/api';
import { BaseRequestApi } from '../base/base-request-api';


export class CommonApi extends BaseRequestApi {
  constructor(args?) {
    super({
      baseURL: LOCAL_SZLIB_WX_API_BASE_URL,
      ...args,
    });
  }
}
