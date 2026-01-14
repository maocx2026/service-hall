import { namespaceT } from '@/helps/namespace-t';

export enum COLLECTION_STATUS {
  IN_LIB = 'IN', // 在馆
  BORROWED = 'BORROWED', // 已借出
}

export function createFilterModel() {
  return {
    library: '',
  };
}

export function getCollectionStatusText(key) {
  const t = namespaceT('szlibBookList.collection.status');
  const mapper = new Map([
    [COLLECTION_STATUS.IN_LIB, t('in')],
    [COLLECTION_STATUS.BORROWED, t('borrowed')],
  ]);
  return mapper.get(key);
}

export function getCollectionStatusTheme(key) {
  const mapper = new Map([
    [COLLECTION_STATUS.IN_LIB, 'green'],
    [COLLECTION_STATUS.BORROWED, 'red'],
  ]);
  return mapper.get(key);
}
