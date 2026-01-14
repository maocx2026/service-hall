import { namespaceT } from '@/helps/namespace-t';

export enum NoticeMethods {
  MESSAGE = 'M', // 微信通知
  SELF = 'S', // 网上自查
}

export function createModel() {
  return {
    bookName: '',
    bookRecordNo: '',
    noteType: NoticeMethods.MESSAGE, // 通知方式
    serviceArea: '龙华区', // 取书区域
    serviceAreaName: '龙华区', // 取书区域中文
    serviceAddr: '', // 取书地点
  };
}

export function createSuccPopup() {
  return {
    shown: false,
    address: '',
  };
}

export function createErrorPopup() {
  return {
    shown: false,
    errorMsg: '',
  };
}

export function createNoticeMethodsOptions() {
  const t = namespaceT('bookAdvanceBorrow.add.noticeMethod');
  const list = [
    NoticeMethods.MESSAGE,
    NoticeMethods.SELF,
  ];
  const mapper = new Map([
    [NoticeMethods.MESSAGE, t('message')],
    [NoticeMethods.SELF, t('self')],
  ]);

  return list.map((key) => ({
    text: mapper.get(key),
    value: key,
  }));
}
