export const Locale = Object.freeze({
  ZH_CN: 'zh_CN',
  ZH_HK: 'zh_HK',
  EN_US: 'en_US',
});

const supportLocales = [];
if (process.env.SUPPORT_LOCALES) {
  const locales = process.env.SUPPORT_LOCALES.split(',').map((l) => l.trim());
  supportLocales.push(...locales);
} else {
  supportLocales.push(Locale.ZH_CN);
}

export const SUPPORT_LOCALES = Object.freeze(supportLocales);

// 语言
export const FALLBACK_LOCALE = process.env.FALLBACK_LOCALE || Locale.ZH_CN;

// 语言URL参数名
export const QUERY_KEY_LOCALE = 'locale';
