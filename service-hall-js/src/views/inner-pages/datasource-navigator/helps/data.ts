import { RouterName as RN } from '@/config/router';
import { OutsideUrl } from '@/config/outside-url';
import { namespaceT } from '@/helps/namespace-t';
import { QuickLinkData } from '@/types/quick-link';

export function createMenuDatas(): QuickLinkData[] {
  const t = namespaceT('menus.datasourceNavigator');
  return [
    {
      key: 'collectionDataSource',
      title: t('collectionDataSource'),
      url: `${OutsideUrl.officalWeb}/page/books.html`,
    },
    {
      key: 'specialCollection',
      title: t('specialCollection'),
      url: `${OutsideUrl.officalWeb}/page/id-222.html`,
    },
    {
      key: RN.SzlibBookList,
      title: t('szlibBookList'),
      routerName: RN.SzlibBookList,
    },
  ];
}
