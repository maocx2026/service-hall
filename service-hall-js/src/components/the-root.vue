<script lang="ts">
import { defineComponent, ref, nextTick, computed, getCurrentInstance } from 'vue';
import { KeepAliveInclude, KeepAliveExclude } from '@/config/keep-alive';
import { SiderMenuCodes as SMC } from '@/config/sider-menu';

import QrcodePage from '@/views/qrcode';
import TheTheme from './the-theme.vue';
import TheLayout from './the-layout.vue';
import TheFooter from './the-footer';


export default defineComponent({
  name: 'TheRoot',

  components: {
    TheTheme,
    TheLayout,
    TheFooter,
    QrcodePage,
  },

  setup() {
    const vm = getCurrentInstance();
    const showView = ref<boolean>(true);
    const showQrcodePage = ref<boolean>(false);

    function rebuildView() {
      showView.value = false;
      nextTick(() => {
        showView.value = true;
      });
    }

    const hasMenu = computed(() => {
      return !!vm.proxy.$route.meta?.showBottomMenu;
    });

    const activeCode = computed(() => {
      if (showQrcodePage.value) {
        return SMC.QrCode;
      }
      return vm.proxy.$route.meta?.activeCode;
    });

    function bindEvents() {
      // 在这里监听点击了读者证二维码
      vm.proxy.$eventBus.on('on-click-qrcode', () => {
        showQrcodePage.value = !showQrcodePage.value;
      });
      vm.proxy.$eventBus.on('on-close-qrcode', () => {
        showQrcodePage.value = false;
      });
    }

    bindEvents();

    return {
      KeepAliveInclude,
      KeepAliveExclude,
      showView,
      hasMenu,
      showQrcodePage,
      activeCode,

      rebuildView,
    };
  },
});
</script>

<template>
  <TheTheme>
    <TheLayout :has-menu="hasMenu">
      <template #main>
        <RouterView v-slot="{ Component }">
          <KeepAlive
            :include="KeepAliveInclude"
            :exclude="KeepAliveExclude"
          >
            <component :is="Component" />
          </KeepAlive>
        </RouterView>

        <QrcodePage
          v-show="showQrcodePage"
        />
      </template>

      <template #footer>
        <TheFooter :active-code="activeCode" />
      </template>
    </TheLayout>
  </TheTheme>
</template>
