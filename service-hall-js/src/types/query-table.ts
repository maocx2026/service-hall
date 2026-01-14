import { ComputedRef } from 'vue';

export interface PaginationType {
  limit: number;
  page: number;
}

export interface TableType {
  data: unknown[];
  total: number;
  loading: boolean;
}

export interface QueryTableType {
  shown: ComputedRef<boolean>;
  simpleSearchModel: object;
  advancedSearchModel: object;
  page: PaginationType;
  table: TableType;
  query: unknown;
  load: () => void;
  search: () => void;
  clear: () => void;
  reset: () => void;
  turnPage: () => void;
  showSimpleSearch: () => void;
  showAdvancedSearch: () => void;
}
