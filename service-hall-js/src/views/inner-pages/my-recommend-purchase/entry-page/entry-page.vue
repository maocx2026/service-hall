<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';

import { onClickLink } from '@/helps/navigation';

import MenusPage from '@/components/business/menu-page.vue';

import { createMenus } from './helps/data';

export default defineComponent({
  components: {
    MenusPage,
  },

  setup() {
    const vm = getCurrentInstance();

    function onClickMenu(item) {
      onClickLink(vm.proxy.$router, item);
    }

    return {
      menus: createMenus(),

      onClickMenu,
    };
  },
});
</script>


<template>
  <MenusPage
    :menus="menus"
    @on-click-item="onClickMenu"
  />
</template>
