<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';

import { push } from '@/helps/navigation';
import { SiderMenuCodes as SMC } from '@/config/sider-menu';

import { createMenus } from './menus';

export default defineComponent({
  props: {
    activeCode: {
      type: String,
      default: '',
    },
  },

  setup() {
    const vm = getCurrentInstance();

    function onClickMenu({ routerName, key }) {
      if (key === SMC.QrCode) {
        vm.proxy.$eventBus.emit('on-click-qrcode');
        return;
      }
      push(vm.proxy.$router, {
        name: routerName,
      });
      vm.proxy.$eventBus.emit('on-close-qrcode');
    }

    return {
      menus: createMenus(),

      SMC,
      vm,

      onClickMenu,
    };
  },
});
</script>

<template>
  <div class="footer-box">
    <div class="footer-menus">
      <div
        v-for="item in menus"
        :key="item.key"
        class="menu-item"
        :class="{'qrcode': item.key === SMC.QrCode}"
        @click="onClickMenu(item)"
      >
        <div
          class="spirte"
          :class="activeCode === item.key ? item.iconClassActive : item.iconClass"
        />
        <div class="title">
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.footer-box {
  height: 100%;
  padding-top: 0.12rem;
  filter: drop-shadow(0px -1px 4px rgba(0, 0, 0, 0.08));

  .footer-menus {
    position: relative;
    display: flex;
    height: 100%;
    justify-content: space-around;
    padding-top: 0.06rem;
    background-color: #fff;

    .menu-item {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 2px;

      .title {
        color: var(--primary-color);
        font-weight: 400;
        font-size: 0.11rem;
        line-height: 1.4;
      }

      &.qrcode {
        position: absolute;
        top: -0.12rem;
        padding: 3px;
        border-radius: 50%;
        background-color: #fff;
      }
    }
  }
}
</style>
