<script lang="ts">
import { defineComponent } from 'vue';

import BlockDataItem from './block-data-item.vue';

export default defineComponent({
  components: {
    BlockDataItem,
  },

  props: {
    dataSource: {
      type: Array,
      default: () => {},
    },
  },
});
</script>

<template>
  <div class="data-wrap">
    <BlockDataItem
      v-for="item in dataSource"
      :key="`data-${item.id}`"
      :data="item"
    />
  </div>
</template>

<style lang="less" scoped>
.data-wrap {
  display: flex;
  align-items: center;
  gap: 0.1rem;
}
</style>
