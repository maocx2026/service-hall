import _ from 'lodash';
import type { Composer } from 'vue-i18n';

import { i18n } from '@/i18n';

type I18nFn = (key: string, ...args: unknown[]) => string;

export function namespaceT(namespace?: string, t = (i18n.global as unknown as Composer).t): I18nFn {
  return (q, ...args:[]) => {
    if (!_.isNil(namespace)) {
      return t(`${namespace}.${q}`, ...args);
    }

    return t(`${q}`, ...args);
  };
}
