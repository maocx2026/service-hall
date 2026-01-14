<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue';
import { Tab, Tabs, Button } from 'vant';

import { RouterName as RN } from '@/config/router';
import { push } from '@/helps/navigation';

import ContentComp from './components/content-comp.vue';

import { createTabs, TabCode, getContentData } from './helps/data';

export default defineComponent({
  components: {
    VTab: Tab,
    VTabs: Tabs,
    VButton: Button,
    ContentComp,
  },

  setup() {
    const vm = getCurrentInstance();
    const activeTab = ref(TabCode.SELF);

    function onClickGoToCart() {
      push(vm.proxy.$router, {
        name: RN.NewBookCarList,
      });
    }

    return {
      activeTab,
      tabs: createTabs(),

      getContentData,
      onClickGoToCart,
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
        v-for="tab in tabs"
        :key="tab.key"
        :name="tab.key"
        :title="tab.title"
      >
        <ContentComp
          :data-source="getContentData(activeTab)"
        />

        <div class="action-block">
          <VButton
            block
            type="primary"
            class="vant-primary-btn"
            @click="onClickGoToCart"
          >
            {{ $t('newBookCart.intoBookCart') }}
          </VButton>
        </div>
      </VTab>
    </VTabs>
  </div>
</template>
