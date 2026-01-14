import {
  getFilterInitStartDate,
  getFilterInitEndDate,
} from '@/helps/get-filter-date-range';

export function createHistoryFilterModel() {
  return {
    dateRange: {
      startDate: getFilterInitStartDate(), // 开始日期
      endDate: getFilterInitEndDate(), // 结束日期
    },
  };
}

export function handleSearchModel(data) {
  const res = { ...data };

  res.startDate = data.dateRange.startDate.join('-');
  res.endDate = data.dateRange.endDate.join('-');

  return res;
}
