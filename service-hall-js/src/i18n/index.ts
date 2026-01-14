import { createI18n } from 'vue-i18n';

import zhCN from '@/i18n/zh-CN';


type MessageSchema = typeof zhCN;

export const i18n = createI18n<[MessageSchema], 'zh_CN'>({
  legacy: false,
  locale: 'zh_CN',
  messages: {
    zh_CN: zhCN,
  },
  silentTranslationWarn: true,
});
