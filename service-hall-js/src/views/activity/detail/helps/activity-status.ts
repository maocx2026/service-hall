import { namespaceT } from '@/helps/namespace-t';

export const ActivityStaus = Object.freeze({
  PROCESS: 'process', // 进行中
  END: 'end', // 已结束
  // TODO：其他状态？
});

export function getActivityStatusText(key) {
  const t = namespaceT('activity.status');
  const mapper = new Map([
    [ActivityStaus.PROCESS, t('process')],
    [ActivityStaus.END, t('end')],
  ]);

  return mapper.get(key);
}

export function getActivityStatusThemeClass(key) {
  const mapper = new Map([
    [ActivityStaus.PROCESS, 'orange'],
    [ActivityStaus.END, 'gray'],
  ]);

  return mapper.get(key);
}

export function getActivityReserveBtnText(key) {
  const t = namespaceT('activity.reserveBtn');
  const mapper = new Map([
    [ActivityStaus.PROCESS, t('process')],
    [ActivityStaus.END, t('end')],
  ]);

  return mapper.get(key);
}
