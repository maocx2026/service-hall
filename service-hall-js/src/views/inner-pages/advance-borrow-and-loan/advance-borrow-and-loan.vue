<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Tab, Tabs } from 'vant';

import { namespaceT } from '@/helps/namespace-t';

import SelfAndLoanList from './components/self-and-loan-list.vue';
import ExpressList from './components/express-list.vue';

import { TabCode } from './helps/data';

export default defineComponent({
  components: {
    VTab: Tab,
    VTabs: Tabs,
    SelfAndLoanList,
    ExpressList,
  },

  setup() {
    const t = namespaceT('myAdvanceBorrowLoad');
    const activeTab = ref(TabCode.SELF);

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
        :name="TabCode.SELF"
        :title="t('tabs.self')"
      >
        <SelfAndLoanList :type="TabCode.SELF" />
      </VTab>
      <VTab
        :name="TabCode.EXPRESS"
        :title="t('tabs.express')"
      >
        <ExpressList />
      </VTab>
      <VTab
        :name="TabCode.LOAN"
        :title="t('tabs.loan')"
      >
        <SelfAndLoanList :type="TabCode.LOAN" />
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
