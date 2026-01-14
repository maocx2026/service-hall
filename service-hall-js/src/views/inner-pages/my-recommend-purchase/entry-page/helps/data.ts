import { namespaceT } from '@/helps/namespace-t';
import { RouterName as RN } from '@/config/router';

export function createMenus() {
  const t = namespaceT('recommendPurchase.menu');
  return [
    {
      key: RN.MyRecommendPurchaseAdd,
      title: t('add'),
      routerName: RN.MyRecommendPurchaseAdd,
    },
    {
      key: RN.MyRecommendPurchaseList,
      title: t('list'),
      routerName: RN.MyRecommendPurchaseList,
    },
  ];
}
