import { reactive } from 'vue';
import _ from 'lodash';

export function createRecord(initial = {}) {
  // FIXME：特殊处理，方便重置reactive对象
  const state = reactive({
    model: {},
  });

  function set(k, v) {
    state.model[k] = v;
  }

  function append(source) {
    Object.entries(source).forEach(([k, v]) => {
      set(k, v);
    });
  }

  function get(k) {
    return state.model[k];
  }

  function keys() {
    return Object.keys(state.model);
  }

  function clear() {
    state.model = {};
  }

  function toObj() {
    return _.clone(state.model);
  }

  append(initial);

  return {
    set,
    append,
    get,
    keys,
    clear,
    toObj,
  };
}
