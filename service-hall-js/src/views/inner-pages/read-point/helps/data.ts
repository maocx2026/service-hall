import { namespaceT } from '@/helps/namespace-t';

export enum PointItemKey {
  TOTAL = 'TOTAL', // 总积分
  YEAR = 'YEAR', // 本年度积分
  AVAILABLE = 'AVAILABLE', // 可用积分
}

export function getPointItemPopupTitle(key) {
  const t = namespaceT('points.popup.title');
  const mapper = new Map([
    [PointItemKey.TOTAL, t('total')],
    [PointItemKey.YEAR, t('year')],
    [PointItemKey.AVAILABLE, t('available')],
  ]);
  return mapper.get(key);
}

export function getPointItemPopupContent(key) {
  const t = namespaceT('points.popup.content');
  const mapper = new Map([
    [PointItemKey.TOTAL, t('totalReadPoint')],
    [PointItemKey.YEAR, t('yearReadPoint')],
    [PointItemKey.AVAILABLE, t('availableReadPoint')],
  ]);
  return mapper.get(key);
}
