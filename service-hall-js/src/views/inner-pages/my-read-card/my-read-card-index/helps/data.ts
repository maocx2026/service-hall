import { RouterName as RN } from '@/config/router';
import { OutsideUrl } from '@/config/outside-url';
import { namespaceT } from '@/helps/namespace-t';
import { slashEnd } from '@/helps/slash-end';
import { QuickLinkData } from '@/types/quick-link';

function getPersonalInfoUrl() {
  const url = slashEnd(OutsideUrl.personalCenter);
  return `${url}/#/personal-info`;
}

export function createMenuDatas(): QuickLinkData[] {
  const t = namespaceT('myReadCard.menus');
  return [
    {
      key: RN.ServiceSearchOpen,
      routerName: RN.ServiceSearchOpen,
      title: t('serviceSearchOpen'),
    },
    {
      key: RN.ChangeCardAuth,
      routerName: RN.ChangeCardAuth,
      title: t('changeCardAuth'),
    },
    {
      key: 'QrcodeReadCard',
      title: t('qrcodeReadCard'),
    },
    {
      key: RN.MessageOrder,
      routerName: RN.MessageOrder,
      title: t('messageOrder'),
    },
    {
      key: RN.ChangePassword,
      routerName: RN.ChangePassword,
      title: t('changePassword'),
    },
    {
      key: RN.AccountBind,
      routerName: RN.AccountBind,
      title: t('accountBind'),
    },
    {
      key: 'CardLoss',
      title: t('cardLoss'),
      url: getPersonalInfoUrl(),
    },
  ];
}
