import { namespaceT } from '@/helps/namespace-t';

const t = namespaceT('myReadCard.serviceSearchOpen.borrowRule');

export const BorrowTypeCode = Object.freeze({
  ZH_BORROW: 'ZH_BORROW',
  EN_BORROW: 'EN_BORROW',
});

const borrowTypeTextMapper = new Map([
  [BorrowTypeCode.ZH_BORROW, t('zhBorrow')],
  [BorrowTypeCode.EN_BORROW, t('enBorrow')],
]);

export function createBorrowTypeOptions() {
  const list = [
    BorrowTypeCode.ZH_BORROW,
    BorrowTypeCode.EN_BORROW,
  ];
  return list.map((key) => ({
    key,
    title: borrowTypeTextMapper.get(key),
  }));
}

export function getBorrowTypeTxt(key) {
  return borrowTypeTextMapper.get(key) || key;
}
