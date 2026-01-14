<script lang="ts">
import { defineComponent, ref, computed, getCurrentInstance } from 'vue';
import { Switch, Cell } from 'vant';

import { namespaceT } from '@/helps/namespace-t';
import { RouterName as RN } from '@/config/router';
import { openConfirmDialog } from '@/helps/dialog';

import BorrowRuleInfo from './components/borrow-rule-info.vue';
import RulePopup from './components/rule-popup.vue';

export default defineComponent({
  components: {
    VSwitch: Switch,
    VCell: Cell,
    BorrowRuleInfo,
    RulePopup,
  },

  setup() {
    const vm = getCurrentInstance();
    const t = namespaceT('myReadCard.serviceSearchOpen');
    const isOpenWifi = ref(false);
    const showRulePopup = ref(false);

    function handleOpenWifi() {
      openConfirmDialog(t('openWifiTip'), () => {
        // TODO:开启无线wifi服务逻辑
        showRulePopup.value = true;
      }, () => {
        isOpenWifi.value = false;
      });
    }

    function handleCloseWifi() {
      openConfirmDialog(t('closeWifiTip'), () => {
        // TODO:关闭无线wifi服务逻辑
        isOpenWifi.value = false;
      }, () => {
        isOpenWifi.value = true;
      });
    }

    function onUpdateValue(newVal) {
      if (newVal) {
        handleOpenWifi();
      } else {
        handleCloseWifi();
      }
    }

    function onClosePopup() {
      showRulePopup.value = false;
      isOpenWifi.value = false;
    }

    function onAgreeRule() {
      // TODO:开启WiFi服务的逻辑
      onClosePopup();
      isOpenWifi.value = true;
    }

    const isWifiRouter = computed(() => {
      return vm.proxy.$route.name === RN.Wifi;
    });

    return {
      t,
      isOpenWifi,
      showRulePopup,
      isWifiRouter,

      onUpdateValue,
      onClosePopup,
      onAgreeRule,
    };
  },
});
</script>


<template>
  <div class="service-search-open">
    <VCell
      :title="t('wifiService')"
      center
      class="service-cell"
    >
      <template #right-icon>
        <VSwitch
          v-model="isOpenWifi"
          class="sh-vant-switch"
          @update:model-value="onUpdateValue"
        />
      </template>
    </VCell>
    <div class="tip">
      {{ t('tip') }}
    </div>

    <BorrowRuleInfo v-if="!isWifiRouter" />

    <RulePopup
      v-model="showRulePopup"
      @on-close="onClosePopup"
      @on-agree="onAgreeRule"
    />
  </div>
</template>

<style lang="less" scoped>
.service-search-open {
  padding: 0.12rem;

  .service-cell {
    height: 0.5rem;
    padding: 0.11rem 0.14rem;
    border-radius: 0.08rem;

    :deep(.van-cell__title) {
      color: #222;
      font-weight: 600;
      font-size: 0.15rem;
    }
  }

  .tip {
    margin-top: 0.06rem;
    padding-left: 0.14rem;
    color: #777;
    font-weight: 400;
    font-size: 0.12rem;
  }
}
</style>
