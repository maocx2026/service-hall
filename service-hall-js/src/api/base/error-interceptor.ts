
import mitt from 'mitt';
import { namespaceT } from '@/helps/namespace-t';

const emitter = mitt();

export function errorInterceptor(error) {
  // 如果响应为401状态码错误，则通知相关事件
  if (error.response?.status === 401) {
    emitter.emit('userUnauthorizedError');
    throw error;
  }

  // 用户AccessToken失效
  if (['F_GET_TOKEN_FAILED', 'ACCESS_CHECK', 'AUTHORIZATION_NULL_AND_VOID'].includes(error.code)) {
    emitter.emit('invaildAccessTokenError');
    throw error;
  }

  // 用户RefershToken失效
  if (error.code === 'F_REFRESH_TOKEN_FAILED'
    || (error.code === 'INVALID' && error.response?.data?.errorList?.INVALID === 'refreshToken')) {
    emitter.emit('invaildRefreshTokenError');
    throw error;
  }

  if (['ACCOUNT_DISABLE', 'ACCOUNT_FREEZE_OR_DEACTIVATE', 'ACCOUNT_EXCEPTION'].includes(error.code)) {
    emitter.emit('catchAccountError', error.code);
    throw error;
  }

  // 超时
  if (error.response?.status === 408
    || (error.code === 'ECONNABORTED' && /timeout of \d+ms exceeded$/.test(error.message))) {
    const t = namespaceT('common.error');
    const err: BaseError = new Error(t('timeoutError'));
    err.code = error.code;
    err.stack = error.stack;
    throw err;
  }

  // 未知错误
  if (error.code === 'OTHER') {
    const t = namespaceT('common.error');
    const err: BaseError = new Error(t('unknowError'));
    err.code = error.code;
    err.stack = error.stack;
    throw err;
  }

  // Network Error 由浏览器抛出 （chrome | safari | edge | firefox 测试可用）
  if (error.message === 'Network Error') {
    const t = namespaceT('common.error');
    throw new Error(t('networkError'));
  }

  throw error;
}
