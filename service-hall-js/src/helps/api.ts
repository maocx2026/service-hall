import _ from 'lodash';


interface PaginationParamsOption {
  page: {
    index: number,
    size: number,
  },
}

interface PaginationResult {
  offsetStart: number,
  maxPageItems: number,
}
/*
export function paginationParams(params: PaginationParamsOption): PaginationResult {
  const o = _.cloneDeep(params);
  const offsetStart = _.get(o, 'page.index', 1);
  const maxPageItems = _.get(o, 'page.size', 20);
  delete o.page;

  Object.assign(o, {
    offsetStart,
    maxPageItems,
  });

  return o;
}
*/


export function paginationParams(params: PaginationParamsOption): PaginationResult {
  const o = _.cloneDeep(params);
  // 1. 取业务参数（默认值防呆）
  const pageIndex = _.get(o, 'page.index', 1);
  const pageSize  = _.get(o, 'page.size', 20);

  // 2. 组装结果：把计算字段挂上去
  return {
    ...o,                 // 保留原始字段，方便后端复用
    offsetStart: (pageIndex - 1) * pageSize,
    maxPageItems: pageSize,
  };
}
