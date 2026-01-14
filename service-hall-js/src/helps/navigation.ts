import _ from 'lodash';
import URI from 'urijs';
import Cookies from 'js-cookie';
import { RouterName as RN, FROM_PARAM_NAME_KEY, FROM_ROUTE_NAME_KEY } from '@/config/router';

import { namespaceT } from './namespace-t';

export function beforeEach(to, from, next) {
  const t = namespaceT('docTitle');
  Object.assign(to.meta, {
    [FROM_ROUTE_NAME_KEY]: from.name,
  });

  document.title = to.meta.title || t('szlib');

  // 检查访问 shaoer-search 路由时是否需要登录
  if (to.name === RN.ShaoerSearch) {
    const accessToken = Cookies.get('access_token');
    if (!accessToken) {
      // 获取当前页面的完整 URL
      const currentUrl = window.location.href;
      // 跳转到登录页面，带上当前页面 URL 作为 destPage 参数
      window.location.href = `https://szlib.org.cn/m/mylibrary/Reader-Access-Auth.html?destPage=${encodeURIComponent(currentUrl)}`;
      next(false); // 阻止当前导航
      return;
    }
  }

  next();
}

export function isCurrentRoot(router) {
  return RN.Root === router.currentRoute.name;
}

export function backToRoot(router) {
  router.replace({ name: RN.Root });
}

export function isCurrentForbidden(router) {
  return RN.Forbidden === router.currentRoute.name;
}

export function goForbidden(router) {
  router.replace({ name: RN.Forbidden });
}

export function canGoBack(router) {
  // 是否存在from值，如果有值才可以操作浏览器后退
  const from = _.get(router.currentRoute, `query.${FROM_PARAM_NAME_KEY}`, null);
  return !_.isNil(from);
}

export function goBack(router) {
  const fromRouteName = _.get(router.currentRoute, `meta.${FROM_ROUTE_NAME_KEY}`);
  const queryFromRouteName = _.get(router.currentRoute, `query.${FROM_PARAM_NAME_KEY}`, null);
  // 会记录fromRouteName在route的meta里，如果fromRouteName是null/Root，则表示是当前为浏览器打开的第一个URL
  // 如果不是第一个URL，则可以直接操作浏览器后退
  if (![null, RN.Root].includes(fromRouteName)) {
    router.back();
  // 如果是第一个URL，无法正常操作浏览后退，则使用replace方法替换，需指定queryFromRouteName才生效
  } else if (!_.isNil(queryFromRouteName)) {
    router.replace({
      name: queryFromRouteName,
    });
  }
}

export const push = (
  router,
  // eslint-disable-next-line max-len
  { name, query = {}, params = {} }: { name: string; query?: Record<string, unknown>; params?: Record<string, unknown> },
) => {
  router.push({
    name,
    query: {
      ...query,
      [FROM_PARAM_NAME_KEY]: router.currentRoute.value.name,
    },
    params,
  });
};

export function goOutSideUrl(options) {
  if (!options.url) return;
  const wxPage = options.wxPage || '../webview/web';
  const params = {
    ...options.params,
    url: options.url,
  };

  const uri = new URI(wxPage);
  uri.addQuery(params);

  let isMiniProgram = false;
  // eslint-disable-next-line global-require, no-undef
  const wx = require('weixin-js-sdk');
  if (wx.miniProgram) {
    wx.miniProgram.getEnv((res) => {
      if (res.miniprogram) {
        isMiniProgram = true;
      }
    });
  }
  if (isMiniProgram) {
    wx.miniProgram.navigateTo({
      url: uri.toString(),
    });
  } else {
    window.open(options.defaultUrl || options.url, '_self');
  }
}

export function onClickLink(router, { url, routerName }: { url?: string; routerName?: string }) {
  if (url) {
    goOutSideUrl({ url });
    return;
  }
  push(router, {
    name: routerName,
  });
}
