import { App } from 'vue';
import wx from 'weixin-js-sdk';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $jWeixin: typeof wx;
  }
}

export const JWeixinPlugin = {
  install(app: App) {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-param-reassign
      app.config.globalProperties.$jWeixin = wx;
    }
  },
};
