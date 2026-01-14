import { CommonApi } from '@/api/common/common-szlib-api';

export class WechatApi extends CommonApi {
  url() {
    return 'getwxconfig';
  }

  method() {
    return 'POST';
  }
}
