import _ from 'lodash';
import { paginationParams } from '@/helps/api';
import { CommonApi } from './common-api';


export class CommonListApi extends CommonApi {
  set params(value) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    super.params = paginationParams(value);
  }

  async send() : Promise<CommonApiListData> {
    const res = await super.send();
    const data = _.get(res, 'data', []);
    const total = _.get(res, 'total', 0);
    return {
      data,
      total,
    };
  }
}
