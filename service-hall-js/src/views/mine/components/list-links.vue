<script lang="ts">
import { defineComponent } from 'vue';

import { createMineListLinks } from '../helps/data';

export default defineComponent({
  emits: [
    'on-click-item',
  ],

  setup(props, { emit }) {
    function onClickLinkItem(item) {
      emit('on-click-item', item);
    }

    return {
      links: createMineListLinks(),

      onClickLinkItem,
    };
  },
});
</script>

<template>
  <div class="quick-link-wrapper">
    <div
      v-for="item in links"
      :key="item.key"
      class="quick-link-item"
      @click="onClickLinkItem(item)"
    >
      <div class="title">
        {{ item.title }}
      </div>

      <div class="spirte spirte-mine-link-right-arrow" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.quick-link-wrapper {
  margin: 0 0.12rem;

  .quick-link-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 0.49rem;
    margin-bottom: 0.01rem;
    padding: 0 0.16rem;
    border-radius: 0.04rem;
    background-color: #fff;
    cursor: pointer;

    .title {
      flex: 1;
    }
  }
}
</style>
