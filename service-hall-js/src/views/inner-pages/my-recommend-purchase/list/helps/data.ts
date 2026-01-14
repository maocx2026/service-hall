import { namespaceT } from '@/helps/namespace-t';

export const Status = Object.freeze({
  REPLYED: 'REPLYED', // 已通知
  REJECT: 'REJECT', // 已拒绝
  PENDING: 'PENDING', // 待处理
});

export function getStatusTxt(key) {
  const t = namespaceT('recommendPurchase.list.status');

  const mapper = new Map([
    [Status.REPLYED, t('replyed')],
    [Status.REJECT, t('reject')],
    [Status.PENDING, t('pending')],
  ]);

  return mapper.get(key) || key;
}


export function getStatusTheme(key) {
  const mapper = new Map([
    [Status.REPLYED, 'green'],
    [Status.REJECT, 'red'],
    [Status.PENDING, 'blue'],
  ]);

  return mapper.get(key) || key;
}
