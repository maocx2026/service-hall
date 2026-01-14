<script lang="ts">
import { defineComponent } from 'vue';

import LinkItem from './link-item.vue';

export default defineComponent({
  components: {
    LinkItem,
  },

  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },

  setup() {
    return {};
  },
});
</script>

<template>
  <div
    :id="content.idName"
    class="block-links"
  >
    <div class="title">
      {{ content.title }}
    </div>

    <div class="links">
      <LinkItem
        v-for="item in content.children"
        :key="item.key"
        :content="item"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.block-links {
  margin-top: 0.2rem;

  .title {
    margin-bottom: 0.1rem;
    padding-left: 0.04rem;
    color: #212121;
    font-weight: 600;
    font-size: 0.16rem;
    line-height: 1.4;
  }
}
</style>
