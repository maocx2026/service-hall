import { namespaceT } from '@/helps/namespace-t';

export const TabCode = Object.freeze({
  SELF: 'SELF', // 自取
  EXPRESS: 'EXPRESS', // 快递
  LOAN: 'LOAN', // 调阅
});

export const Status = Object.freeze({
  READYING: 'READYING', // 文献准备中
  TIME_OUT: 'TIME_OUT', // ·超时未取自动取消
  READER_CANCEL: 'READER_CANCEL', // ·读者主动取消请求
});


export function getStatusTxt(key) {
  const t = namespaceT('myAdvanceBorrowLoad.status');

  const mapper = new Map([
    [Status.READYING, t('readying')],
    [Status.TIME_OUT, t('timeout')],
    [Status.READER_CANCEL, t('readerCancel')],
  ]);

  return mapper.get(key) || key;
}


export function getItemTheme(key) {
  const mapper = new Map([
    [Status.READYING, ''],
    [Status.TIME_OUT, 'cancel'],
    [Status.READER_CANCEL, 'cancel'],
  ]);

  return mapper.get(key) || key;
}

export const ExpressStatus = Object.freeze({
  PENDING: 'PENDING', // 待受理
  READER_CANCEL: 'READER_CANCEL', // ·读者自行取消
});


export function getExpressStatusTxt(key) {
  const t = namespaceT('myAdvanceBorrowLoad.expressStatus');

  const mapper = new Map([
    [ExpressStatus.PENDING, t('pending')],
    [ExpressStatus.READER_CANCEL, t('readerCancel')],
  ]);

  return mapper.get(key) || key;
}


export function getExpressItemTheme(key) {
  const mapper = new Map([
    [ExpressStatus.PENDING, ''],
    [ExpressStatus.READER_CANCEL, 'cancel'],
  ]);

  return mapper.get(key) || key;
}
