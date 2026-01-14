<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Tab, Tabs } from 'vant';

import { namespaceT } from '@/helps/namespace-t';

import DebtDepositAdvance from './components/debt-deposit-advance.vue';
import FinaceHistory from './components/finace-history.vue';

import { TabCode } from './helps/data';

export default defineComponent({
  components: {
    VTab: Tab,
    VTabs: Tabs,
    DebtDepositAdvance,
    FinaceHistory,
  },

  setup() {
    const t = namespaceT('myFinance');
    const activeTab = ref(TabCode.CURRENT);

    return {
      t,
      activeTab,
      TabCode,
    };
  },
});
</script>

<template>
  <div>
    <VTabs
      v-model:active="activeTab"
      class="sh-vant-tabs"
    >
      <VTab
        :name="TabCode.CURRENT"
        :title="t('tabs.current')"
      >
        <DebtDepositAdvance />
      </VTab>
      <VTab
        :name="TabCode.HISTORY"
        :title="t('tabs.history')"
      >
        <FinaceHistory />
      </VTab>
    </VTabs>
  </div>
</template>

<style lang="less" scoped>
:deep(.content-wrap) {
  padding: 0.2rem 0.12rem;
  background-color: #f7f8ff;
}
</style>
