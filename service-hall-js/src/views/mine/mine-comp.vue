<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';

import { push, goOutSideUrl } from '@/helps/navigation';

import ReadCardInfo from './components/read-card-info.vue';
import TopAuickLinks from './components/top-quick-links.vue';
import ListLinks from './components/list-links.vue';

export default defineComponent({
  components: {
    ReadCardInfo,
    TopAuickLinks,
    ListLinks,
  },

  setup() {
    const vm = getCurrentInstance();

    function onClickLinkItem({ routerName, url }) {
      if (url) {
        goOutSideUrl({ url });
      } else if (routerName) {
        push(vm.proxy.$router, {
          name: routerName,
        });
      }
    }

    return {
      onClickLinkItem,
    };
  },
});
</script>

<template>
  <div>
    <ReadCardInfo />

    <TopAuickLinks
      @on-click-item="onClickLinkItem"
    />

    <ListLinks
      @on-click-item="onClickLinkItem"
    />
  </div>
</template>
