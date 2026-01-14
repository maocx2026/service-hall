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
    const { idCardNo } = vm.proxy.$route.query;

    function onClickMenuItem(item) {
      onClickLink(vm.proxy.$router, item);
    }

    return {
      menus: createMenuDatas(),
      idCardNo,

      onClickMenuItem,
    };
  },
});
</script>


<template>
  <MenuPage
    :menus="menus"
    @on-click-item="onClickMenuItem"
  >
    <div class="menu-item">
      {{ $t('findPassword.idCardNo') }}：
      {{ idCardNo }}
    </div>
  </MenuPage>
</template>

<style lang="less" scoped>
.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 0.49rem;
  margin-bottom: 0.01rem;
  padding-left: 0.16rem;
  padding-right: 0.12rem;
  border-radius: 0.04rem;
  background-color: #fff;
}
</style>
