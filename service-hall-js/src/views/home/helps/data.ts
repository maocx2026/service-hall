import { namespaceT } from '@/helps/namespace-t';
import { RouterName as RN } from '@/config/router';
import { OutsideUrl } from '@/config/outside-url';


// 头部的快速导航
export function topQuickLinkData() {
  return [
    // 深图数据
    {
      key: RN.SzlibData,
      icon: 'spirte-szlib-data',
      routerName: RN.SzlibData,
    },
    // 在线咨询
    {
      key: 'OnlineConsult',
      icon: 'spirte-consult-online',
      url: '', // TODO:链接
    },
  ];
}

// banner轮播
export function createBannerSwiperData() {
  const t = namespaceT('home.banner');
  return [
    [
      {
        key: RN.MyReadCard,
        title: t('myReadCard'),
        routerName: RN.MyReadCard,
        icon: 'spirte-my-read-card',
      },
      {
        key: RN.MyFinance,
        title: t('myFinance'),
        routerName: RN.MyFinance,
        icon: 'spirte-my-finance',
      },
      {
        key: RN.ApplyVirtuallyCard,
        title: t('applyVirtuallyCard'),
        routerName: RN.ApplyVirtuallyCard,
        icon: 'spirte-apply-virtual-certificate',
      },
      {
        key: RN.Wifi,
        title: t('wifi'),
        routerName: RN.Wifi,
        icon: 'spirte-wifi',
      },
      {
        key: RN.MyBorrow,
        title: t('myBorrow'),
        routerName: RN.MyBorrow,
        icon: 'spirte-my-borrow',
      },
      {
        key: RN.BookAdvanceBorrow,
        title: t('advanceBorrow'),
        routerName: RN.BookAdvanceBorrow,
        icon: 'spirte-advance-borrow',
      },
      {
        key: RN.DatasourceNavigator,
        title: t('datasourceNavigator'),
        routerName: RN.DatasourceNavigator,
        icon: 'spirte-source-navigator',
      },
      {
        key: 'ChildService',
        title: t('childService'),
        url: `${OutsideUrl.officalWeb}/page/smart-bank-profile.html`,
        icon: 'spirte-child-service',
      },
    ],
    [
      {
        key: 'AppointCenter',
        title: t('appointCenter'),
        url: OutsideUrl.appointCenter,
        icon: 'spirte-appoint-center',
      },
      {
        key: RN.ServiceGuide,
        title: t('serviceGuide'),
        routerName: RN.ServiceGuide,
        icon: 'spirte-service-guide',
      },
    ],
  ];
}

// 资源
export function createDataSourceData() {
  const t = namespaceT('home.dataSource.link');
  return [
    {
      key: RN.MobileRead,
      title: t('mobileRead'),
      icon: 'spirte-mobile-read',
      routerName: RN.MobileRead,
    },
    {
      key: RN.NewBookCar,
      title: t('newBookCar'),
      icon: 'spirte-new-book-car',
      routerName: RN.NewBookCar,
    },
    {
      key: 'SzlibMedia',
      title: t('szlibMedia'),
      icon: 'spirte-szlib-media',
      url: OutsideUrl.szlibMedia,
    },
    {
      key: RN.SzlibBookList,
      title: t('szlibBookList'),
      icon: 'spirte-szlib-book-list',
      routerName: RN.SzlibBookList,
    },
  ];
}

// 上新
export function createUpdateNewData() {
  const t = namespaceT('home.updateNew.link');
  return [
    {
      key: 'CityBorrow',
      title: t('cityBorrow'),
      icon: 'spirte-city-advance-borrow',
      // TODO:打开小程序的
    },
    {
      key: 'SzlibNorth',
      title: t('szlibNorth'),
      icon: 'spirte-north-lib',
      url: OutsideUrl.szlibNorth,
    },
    {
      key: 'AppointCenter',
      title: t('appointCenter'),
      icon: 'spirte-appoint-center',
      url: OutsideUrl.appointCenter,
    },
    {
      key: RN.CreditPointList,
      title: t('creditPoint'),
      icon: 'spirte-credit-point',
      routerName: RN.CreditPointList,
    },
  ];
}
