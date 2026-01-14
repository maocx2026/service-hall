import { namespaceT } from '@/helps/namespace-t';

export const ActivityType = Object.freeze({
  LECTURE: 'lecture', // 讲座
  TRAIN: 'train', // 培训
  SALON: 'salon', // 活动
  EXHIBITION: 'exhibition', // 展览
});

export function createActivityTabs() {
  const t = namespaceT('activity.tabs');
  return [
    {
      key: ActivityType.SALON,
      title: t('salon'),
    },
    {
      key: ActivityType.LECTURE,
      title: t('lecture'),
    },
    {
      key: ActivityType.TRAIN,
      title: t('train'),
    },
    {
      key: ActivityType.EXHIBITION,
      title: t('exhibition'),
    },
  ];
}
