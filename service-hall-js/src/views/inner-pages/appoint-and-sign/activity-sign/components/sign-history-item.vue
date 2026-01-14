<script lang="ts">
import { defineComponent } from 'vue';

import { namespaceT } from '@/helps/namespace-t';

export default defineComponent({
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },

  setup() {
    const t = namespaceT('activitySign');

    return {
      t,
    };
  },
});
</script>


<template>
  <div class="list-item">
    <div class="title">
      {{ content.title }}
    </div>
    <div class="item">
      {{ t('label.time') }}
      {{ content.time }}
    </div>
    <div
      v-if="content.type"
      class="item"
    >
      {{ t('label.type') }}
      {{ content.type }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.list-item {
  padding: 0.14rem;
  line-height: 1.45;

  .title {
    margin-bottom: 0.04rem;
    color: #444;
    font-weight: 600;
    font-size: 0.15rem;
  }

  .item {
    margin-bottom: 0.04rem;
    color: #777;
    font-weight: 400;
    font-size: 0.12rem;
  }
}
</style>
