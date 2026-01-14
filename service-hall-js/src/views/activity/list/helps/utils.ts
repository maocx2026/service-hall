import { namespaceT } from '@/helps/namespace-t';
import { ActivityType } from './data';

const t = namespaceT('activity.title');

const mapper = new Map([
  [ActivityType.LECTURE, t('lecture')],
  [ActivityType.TRAIN, t('train')],
  [ActivityType.SALON, t('salon')],
  [ActivityType.EXHIBITION, t('exhibition')],
]);

export function getActivityListTitle(key) {
  return mapper.get(key);
}
