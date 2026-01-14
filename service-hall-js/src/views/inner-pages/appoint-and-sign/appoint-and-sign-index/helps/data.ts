import URI from 'urijs';
import { RouterName as RN } from '@/config/router';
import { OutsideUrl } from '@/config/outside-url';
import { namespaceT } from '@/helps/namespace-t';
import { QuickLinkData } from '@/types/quick-link';

function getAppointQueryUrl() {
  const uri = new URI(OutsideUrl.appointCenter);
  uri.segment('BookingCheck');
  return uri.toString();
}

export function createMenuDatas(): QuickLinkData[] {
  const t = namespaceT('menus.appointAndSign');
  return [
    {
      key: 'appointQuery',
      title: t('appointQuery'),
      url: getAppointQueryUrl(),
    },
    {
      key: 'activitySign',
      title: t('activitySign'),
      routerName: RN.ActivitySign,
    },
  ];
}
