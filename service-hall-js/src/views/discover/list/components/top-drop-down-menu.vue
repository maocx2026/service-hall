<script lang="ts">
import { defineComponent, toRef } from 'vue';
import { DropdownMenu, DropdownItem } from 'vant';

import { createLibAreaOptions, createLibTypeOptions } from '../helps/data';

export default defineComponent({
  components: {
    VDropdownMenu: DropdownMenu,
    VDropdownItem: DropdownItem,
  },

  props: {
    modelValue: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {
    const queryModel = toRef(props, 'modelValue');

    return {
      queryModel,
      areaOptions: createLibAreaOptions(),
      typeOptions: createLibTypeOptions(),
    };
  },
});
</script>

<template>
  <VDropdownMenu
    class="library-search-menu sh-van-dropdown-menu"
  >
    <VDropdownItem
      v-model="queryModel.district"
      :options="areaOptions"
      v-bind="$attrs"
    />
    <VDropdownItem
      v-model="queryModel.sitType"
      :options="typeOptions"
      v-bind="$attrs"
    />
  </VDropdownMenu>
</template>

<style lang="less">
.library-search-menu {
  padding-bottom: 0.24rem;
  background: linear-gradient(311deg, #4060d0 -3.29%, #4d6ef6 51.72%, #4162d3 104.58%);

  .van-dropdown-menu__bar {
    height: 0.52rem;
  }
}
</style>
