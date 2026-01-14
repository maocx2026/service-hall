<script lang="ts">
import { defineComponent, ref } from 'vue';
import { DropdownMenu, DropdownItem } from 'vant';

import { namespaceT } from '@/helps/namespace-t';
import { V_INDEX_CODE } from '@/consts/opac-fields';

import SearchInput from '@/components/business/search-input.vue';

import { createVIndexOptions } from '../helps/data';


export default defineComponent({
  components: {
    VDropdownMenu: DropdownMenu,
    VDropdownItem: DropdownItem,
    SearchInput,
  },

  props: {
    modelValue: {
      type: Object,
      default: () => {},
    },
  },

  emits: [
    'on-search',
  ],

  setup(props, { emit }) {
    const t = namespaceT('bookAdvanceBorrow.list');

    const model = ref(props.modelValue);

    function onSearch() {
      emit('on-search');
    }

    function onScan(keyword) {
      Object.assign(model.value, {
        v_index: V_INDEX_CODE.ISBN,
        v_value: keyword,
      });
      onSearch();
    }

    return {
      t,
      model,

      vIndexOptions: createVIndexOptions(),

      onSearch,
      onScan,
    };
  },
});
</script>


<template>
  <div class="header">
    <VDropdownMenu class="sh-van-dropdown-menu">
      <VDropdownItem
        v-model="model.v_index"
        :options="vIndexOptions"
        @change="onSearch"
      />
    </VDropdownMenu>

    <SearchInput
      v-model="model.v_value"
      :placeholder="t('keyword')"
      class="search-input-item"
      can-scan
      @search="onSearch"
      @on-scan="onScan"
    />
  </div>
</template>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  gap: 0.16rem;
  height: 0.89rem;
  padding: 0 0.16rem 0.21rem;
  background: linear-gradient(311deg, #4060d0 -3.29%, #4d6ef6 51.72%, #4162d3 104.58%);

  .search-input-item {
    flex: 1;
  }
}
</style>
