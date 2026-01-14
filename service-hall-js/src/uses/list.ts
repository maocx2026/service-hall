import { toRefs, reactive, toRaw } from 'vue';


export const useList = (config) => {
  if (typeof config !== 'object' || !('fetch' in config) || typeof config.fetch !== 'function') {
    throw new Error('useList must have "fetch" function');
  }

  function createPage({ size }) {
    return {
      size: (size || 20),
      index: 1,
    };
  }

  const state = reactive({
    loading: false,
    refreshing: false,
    finished: false,
    error: false,
    page: createPage({ size: config.size }),
    data: [],
    offset: 0,
    total: 0,
    other: {},
  });

  async function fetch() {
    const res = await config.fetch({
      page: toRaw(state.page),
    });
    return res;
  }

  function insertData({ data, total, other }, append = false) {
    if (append) {
      state.data = Array.isArray(data) ? state.data.concat(data) : [];
    } else {
      state.data = Array.isArray(data) ? data : [];
    }

    state.total = total || 0;
    state.page.index += 1;
    state.offset = (state.page.index - 1) * state.page.size;
    state.finished = state.data.length >= state.total;
    state.other = other;


    if (state.error) {
      state.error = false;
    }
  }

  async function loadData() {
    if (state.loading || state.refreshing) {
      return;
    }

    state.loading = true;
    try {
      const res = await fetch();
      insertData(res, true);
    } catch (error) {
      state.error = true;
      throw error;
    } finally {
      state.loading = false;
    }
  }

  async function refreshData() {
    if (state.loading || state.refreshing) {
      return;
    }

    state.refreshing = true;
    state.page.index = 1;
    try {
      const res = await fetch();
      insertData(res, false);
    } catch (error) {
      state.error = true;
      throw error;
    } finally {
      state.refreshing = false;
    }
  }

  function reset() {
    state.loading = false;
    state.refreshing = false;
    state.finished = false;
    state.error = false;
    state.page.index = 1;
    state.data = [];
    state.offset = 0;
    state.total = 0;
  }

  return {
    ...toRefs(state),
    load: loadData,
    refresh: refreshData,
    reset,
  };
};

export default useList;
