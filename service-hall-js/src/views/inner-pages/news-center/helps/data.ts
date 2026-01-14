import { OutsideUrl } from '@/config/outside-url';
import { namespaceT } from '@/helps/namespace-t';
import { QuickLinkData } from '@/types/quick-link';

export function createMenuDatas(): QuickLinkData[] {
  const t = namespaceT('menus.newsCenter');
  return [
    {
      key: 'notices',
      title: t('notices'),
      url: `${OutsideUrl.officalWeb}/article/notice-bulletin.html`,
    },
    {
      key: 'mediaNews',
      title: t('mediaNews'),
      url: `${OutsideUrl.officalWeb}/article/media-reports.html`,
    },
  ];
}
