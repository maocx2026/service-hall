import Cookies from 'js-cookie';

import { ACCESSS_TOKEN_COOKIE_KEY } from '@/config/cookie-key';


/**
 * 获取accessTokenToken
 * @function getAccessToken
 * @returns { string } - accessToken
 */
export function getAccessToken() {
  // TODO:暂时写死token
  return Cookies.get(ACCESSS_TOKEN_COOKIE_KEY) || 'd38569af-97b2-4df7-888a-7d28fbf79078';
}
