<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';

import { onClickLink } from '@/helps/navigation';

import MenuPage from '@/components/business/menu-page.vue';

import { createMenuDatas } from './helps/data';

export default defineComponent({
  components: {
    MenuPage,
  },

  setup() {
    const vm = getCurrentInstance();

    function onClickMenuItem(item) {
      onClickLink(vm.proxy.$router, item);
    }

    return {
      menus: createMenuDatas(),

      onClickMenuItem,
    };
  },
});
</script>


<template>
  <MenuPage
    :menus="menus"
    @on-click-item="onClickMenuItem"
  />
</template>
