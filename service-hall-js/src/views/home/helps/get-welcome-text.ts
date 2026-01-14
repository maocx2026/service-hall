import { namespaceT } from '@/helps/namespace-t';

export function getWelcomeTextBaseOnTime(): string {
  const t = namespaceT('home.welcome');
  const now = new Date();
  const hours = now.getHours();

  // 早上05:00-11:59
  // 中午12:00-13:59
  // 下午14:00-17:59
  // 晚上18:00-04:59

  if (hours >= 5 && hours < 12) {
    return t('morning');
  }

  if (hours >= 12 && hours < 14) {
    return t('noon');
  }

  if (hours >= 14 && hours < 18) {
    return t('afternoon');
  }

  return t('evening');
}
