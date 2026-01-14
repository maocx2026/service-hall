<script lang="ts">
import { defineComponent } from 'vue';

import TopAnchorLink from './components/top-anchor-link.vue';
import ContentBlockLinks from './components/content-block-links.vue';

import { createLinksData } from './helps/data';

export default defineComponent({
  components: {
    TopAnchorLink,
    ContentBlockLinks,
  },

  setup() {
    return {
      linksData: createLinksData(),
    };
  },
});
</script>

<template>
  <div>
    <TopAnchorLink />
    <div
      id="mobile-read-content"
      class="mobile-read"
    >
      <ContentBlockLinks
        v-for="item in linksData"
        :key="item.key"
        :content="item"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.mobile-read {
  height: calc(100vh - 0.56rem);
  margin-top: -0.94rem;
  padding: 0 0.16rem 0.2rem;
  border-top-left-radius: 0.24rem;
  border-top-right-radius: 0.24rem;
  background-color: #f7f8ff;
  overflow: auto;
}
</style>
