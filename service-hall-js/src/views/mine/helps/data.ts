import { namespaceT } from '@/helps/namespace-t';
import { RouterName as RN } from '@/config/router';

export function createMineQucikLinks() {
  const t = namespaceT('mine.quickLink');
  return [
    {
      key: RN.BorrowHistory,
      title: t('borrowHistory'),
      routerName: RN.BorrowHistory,
      icon: 'spirte-borrow-history',
    },
    {
      key: RN.MyCollection,
      title: t('collection'),
      routerName: RN.MyCollection,
      icon: 'spirte-my-collection',
    },
    {
      key: RN.AdvanceBorrowAndLoan,
      title: t('borrowAndLoan'),
      routerName: RN.AdvanceBorrowAndLoan,
      icon: 'spirte-preloan-loan',
    },
    {
      key: RN.AppointAndSign,
      title: t('appointAndSign'),
      routerName: RN.AppointAndSign,
      icon: 'spirte-appoint-sign',
    },
  ];
}

export function createMineListLinks() {
  const t = namespaceT('mine.listLink');
  return [
    {
      key: RN.PersonalInfo,
      title: t('personalInfo'),
      routerName: RN.PersonalInfo,
    },
    {
      key: RN.MyReadCard,
      title: t('readCard'),
      routerName: RN.MyReadCard,
    },
    {
      key: RN.MyBorrow,
      title: t('myBorrow'),
      routerName: RN.MyBorrow,
    },
    {
      key: RN.MyFinance,
      title: t('myFinance'),
      routerName: RN.MyFinance,
    },
    {
      key: RN.ExpressBookCart,
      title: t('expressBookCart'),
      routerName: RN.ExpressBookCart,
    },
    {
      key: RN.MyRecommendPurchase,
      title: t('myRecommendPurchase'),
      routerName: RN.MyRecommendPurchase,
    },
    {
      key: RN.RelateFamilyAccount,
      title: t('relateFamilyAccount'),
      routerName: RN.RelateFamilyAccount,
    },
  ];
}
