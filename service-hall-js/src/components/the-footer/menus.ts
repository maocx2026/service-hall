import { namespaceT } from '@/helps/namespace-t';
import { SiderMenuCodes as SMC } from '@/config/sider-menu';
import { RouterName as RN } from '@/config/router';

export function createMenus() {
  const t = namespaceT('menus');

  return [
    // 首页
    {
      key: SMC.Home,
      title: t('home'),
      routerName: RN.Home,
      iconClass: 'spirte-menu-home',
      iconClassActive: 'spirte-menu-home-active',
    },
    // 发现
    {
      key: SMC.Discover,
      title: t('discover'),
      routerName: RN.Discover,
      iconClass: 'spirte-menu-discover',
      iconClassActive: 'spirte-menu-discover-active',
    },
    // 二维码
    {
      key: SMC.QrCode,
      title: '',
      routerName: RN.QrCode,
      iconClass: 'spirte-menu-qrcode',
      iconClassActive: 'spirte-menu-qrcode-close',
    },
    {
      key: 'qrcodeCopy',
      title: '',
      routerName: RN.QrCode,
      iconClass: '',
      iconClassActive: '',
    },
    // 活动
    {
      key: SMC.Activity,
      title: t('activity'),
      routerName: RN.Activity,
      iconClass: 'spirte-menu-activity',
      iconClassActive: 'spirte-menu-activity-active',
    },
    // 我的
    {
      key: SMC.Mine,
      title: t('my'),
      routerName: RN.Mine,
      iconClass: 'spirte-menu-my',
      iconClassActive: 'spirte-menu-my-active',
    },
  ];
}
