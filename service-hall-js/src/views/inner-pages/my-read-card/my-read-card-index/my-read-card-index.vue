<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';

import { onClickLink } from '@/helps/navigation';

import MenuPage from '@/components/business/menu-page.vue';
import ReadCardInfo from './components/read-card-info.vue';

import { createMenuDatas } from './helps/data';

export default defineComponent({
  components: {
    MenuPage,
    ReadCardInfo,
  },

  setup() {
    const vm = getCurrentInstance();

    function onClickMenuItem(item) {
      if (item.key === 'QrcodeReadCard') {
        vm.proxy.$eventBus.emit('on-click-qrcode');
        return;
      }
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
  <div class="pt-12">
    <ReadCardInfo />
    <MenuPage
      :menus="menus"
      @on-click-item="onClickMenuItem"
    />
  </div>
</template>
