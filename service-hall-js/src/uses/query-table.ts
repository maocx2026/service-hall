import _ from 'lodash';
import { reactive, computed, ref, unref } from 'vue';
import { createRecord } from '@/uses/record';
import { e } from '@/utils/dom';

const scrollIntoView = () => {
  // TODO: 可指定元素
  const table = e('.ivu-table-wrapper.we-p');
  if (!_.isNil(table)) {
    if (window.pageYOffset > table.offsetTop) {
      table.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }
};

function createPage() {
  return {
    limit: 10,
    page: 1,
  };
}

export function useQueryTable(config) {
  // eslint-disable-next-line
  config = Object.assign(
    {
      load: () => { },
      simpleSearchModel: {},
      advancedSearchModel: {},
      scrollIntoView: true,
    },
    config,
  );

  const simpleSearchModel = reactive({ ...config.simpleSearchModel });
  const advancedSearchModel = reactive({ ...config.advancedSearchModel });

  const searchBarStatus = ref(true);

  const shown = computed(() => unref(searchBarStatus));

  const page = reactive(createPage());

  const table = reactive({
    data: [],
    total: 0,
    offset: 0,
    count: {},
    loading: false,
  });
  const record = createRecord({ page, ...config.simpleSearchModel });
  const query = computed(() => record.toObj());

  async function loadData() {
    table.loading = true;
    try {
      const data = await config.load(query.value);
      table.data = data.data;
      table.total = data.total;
      table.offset = (page.page - 1) * page.limit;
      table.count = data.count || {};

      if (config.scrollIntoView) {
        scrollIntoView();
      }
    } finally {
      table.loading = false;
    }
  }

  function turnPage() {
    record.append({ page });

    loadData();
  }

  function load() {
    loadData();
  }

  function search() {
    page.page = 1;
    record.clear();
    record.append({ page });

    if (unref(searchBarStatus)) {
      record.append(simpleSearchModel);
    } else {
      record.append(advancedSearchModel);
    }

    loadData();
  }

  function clear() {
    Object.assign(simpleSearchModel, config.simpleSearchModel);
    Object.assign(advancedSearchModel, config.advancedSearchModel);
  }

  function reset() {
    Object.assign(advancedSearchModel, config.advancedSearchModel);
    search();
  }

  function cancel() {
    Object.assign(advancedSearchModel, config.advancedSearchModel);
    record.append({ page });

    record.append(simpleSearchModel);

    loadData();
  }

  function showSimpleSearch() {
    searchBarStatus.value = true;
    cancel();
  }

  function showAdvancedSearch() {
    searchBarStatus.value = false;
  }

  return {
    shown,
    simpleSearchModel,
    advancedSearchModel,
    page,
    table,
    query,
    load,
    search,
    clear,
    reset,
    turnPage,
    showSimpleSearch,
    showAdvancedSearch,
  };
}
