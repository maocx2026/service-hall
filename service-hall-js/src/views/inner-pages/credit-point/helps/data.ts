import { namespaceT } from '@/helps/namespace-t';

export enum PointItemKey {
  INFO = 'INFO', // 信息完整度
  FAITHFUL = 'FAITHFUL', // 忠实度
  DYNAMIC = 'DYNAMIC', // 活跃度
  SHINE = 'SHINE', // 闪光都
}

export function getFullPoints(key) {
  const mapper = new Map([
    [PointItemKey.INFO, 150],
    [PointItemKey.FAITHFUL, 250],
    [PointItemKey.DYNAMIC, 655],
    [PointItemKey.SHINE, 100],
  ]);
  return mapper.get(key);
}

export function getPointItemPopupTitle(key) {
  const t = namespaceT('points.popup.title');
  const mapper = new Map([
    [PointItemKey.INFO, t('info')],
    [PointItemKey.FAITHFUL, t('faithful')],
    [PointItemKey.DYNAMIC, t('dynamic')],
    [PointItemKey.SHINE, t('shine')],
  ]);
  return mapper.get(key);
}

export function getPointItemPopupContent(key) {
  const t = namespaceT('points.popup.content');
  const mapper = new Map([
    [PointItemKey.INFO, t('info')],
    [PointItemKey.FAITHFUL, t('faithful')],
    [PointItemKey.DYNAMIC, t('dynamic')],
    [PointItemKey.SHINE, t('shine')],
  ]);
  return mapper.get(key);
}
