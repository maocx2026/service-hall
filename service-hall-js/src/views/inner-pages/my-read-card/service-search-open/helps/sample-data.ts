import { BorrowTypeCode } from './data';

export function getBorrowRuleInfoData(type) {
  const zhData = {
    borrowNum: 10,
    totalNum: 10,
    data: [
      {
        type: '励读图书',
        limit: 10,
        days: 31,
      },
      {
        type: '励读期刊',
        limit: 10,
        days: 31,
      },
      {
        type: '励读音像',
        limit: 10,
        days: 31,
      },
      {
        type: '精品文献',
        limit: 2,
        days: 2,
      },
      {
        type: '港台文献',
        limit: 2,
        days: 2,
      },
      {
        type: '中文图书',
        limit: 10,
        days: 31,
      },
      {
        type: '期刊',
        limit: 10,
        days: 21,
      },
      {
        type: '盲文',
        limit: 10,
        days: 60,
      },
      {
        type: '音像资料',
        limit: 10,
        days: 21,
      },
      {
        type: '大学城中文图书',
        limit: 10,
        days: 31,
      },
      {
        type: '电子设备',
        limit: 1,
        days: 180,
      },
    ],
  };
  const enData = {
    borrowNum: 1,
    totalNum: 1,
    data: [
      {
        type: '外文图书',
        limit: 1,
        days: 31,
      },
    ],
  };

  return type === BorrowTypeCode.ZH_BORROW
    ? zhData
    : enData;
}
