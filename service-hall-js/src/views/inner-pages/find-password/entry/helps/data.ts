import { RouterName as RN } from '@/config/router';
import { namespaceT } from '@/helps/namespace-t';
import { QuickLinkData } from '@/types/quick-link';

export function createMenuDatas(): QuickLinkData[] {
  const t = namespaceT('menus.findPassword');
  return [
    {
      key: 'login',
      title: t('login'),
      routerName: RN.FindLoginPassword,
    },
    {
      key: 'self',
      title: t('self'),
      routerName: RN.FindSelfPassword,
    },
  ];
}
