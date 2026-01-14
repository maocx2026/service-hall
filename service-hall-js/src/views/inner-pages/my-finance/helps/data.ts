export const TabCode = Object.freeze({
  CURRENT: 'CURRENT', // 欠款/押金/预付款
  HISTORY: 'HISTORY', // 财经历史
});

export function getFintypeOptions() {
  return [
    {
      value: '交预付押金',
      title: '交预付押金',
    },
    {
      value: '退预付押金',
      title: '退预付押金',
    },
    {
      value: '读者交预付款',
      title: '读者交预付款',
    },
    {
      value: '读者消费付款',
      title: '读者消费付款',
    },
    {
      value: '读者取预付款',
      title: '读者取预付款',
    },
    {
      value: '读者存预付款',
      title: '读者存预付款',
    },
    {
      value: '读者申请线上退押金',
      title: '读者申请线上退押金',
    },
    {
      value: '拒绝读者线上退押金',
      title: '拒绝读者线上退押金',
    },
  ];
}
