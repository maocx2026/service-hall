import { OutsideUrl } from '@/config/outside-url';
import { namespaceT } from '@/helps/namespace-t';
import { slashEnd } from '@/helps/slash-end';
import { QuickLinkData } from '@/types/quick-link';

function getModLoginPwdUrl() {
  const url = slashEnd(OutsideUrl.personalCenter);
  return `${url}/#/modify-login-pwd`;
}

function getModSelfPwdUrl() {
  const url = slashEnd(OutsideUrl.personalCenter);
  return `${url}/#/modify-self-pwd`;
}

export function createMenuDatas(): QuickLinkData[] {
  const t = namespaceT('menus.changePassword');
  return [
    {
      key: 'changeLoginPwd',
      title: t('changeLoginPwd'),
      url: getModLoginPwdUrl(),
    },
    {
      key: 'changeSelfPwd',
      title: t('changeSelfPwd'),
      url: getModSelfPwdUrl(),
    },
  ];
}
