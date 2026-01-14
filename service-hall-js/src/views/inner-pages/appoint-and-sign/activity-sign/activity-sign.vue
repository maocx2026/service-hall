<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Tab, Tabs } from 'vant';

import { namespaceT } from '@/helps/namespace-t';

import TodaySign from './components/today-sign.vue';
import SignHistory from './components/sign-history.vue';

import { TabCode } from './helps/data';

export default defineComponent({
  components: {
    VTab: Tab,
    VTabs: Tabs,
    TodaySign,
    SignHistory,
  },

  setup() {
    const t = namespaceT('activitySign');
    const activeTab = ref(TabCode.SIGN);

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
        :name="TabCode.SIGN"
        :title="t('tabs.sign')"
      >
        <TodaySign />
      </VTab>
      <VTab
        :name="TabCode.HISTORY"
        :title="t('tabs.history')"
      >
        <SignHistory />
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
