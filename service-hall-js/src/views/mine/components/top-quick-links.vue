<script lang="ts">
import { defineComponent } from 'vue';

import { createMineQucikLinks } from '../helps/data';

export default defineComponent({
  emits: [
    'on-click-item',
  ],

  setup(props, { emit }) {
    function onClickLinkItem(item) {
      emit('on-click-item', item);
    }

    return {
      links: createMineQucikLinks(),

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
      <div :class="`${item.icon} spirte`" />
      <div class="title">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.quick-link-wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  margin: -0.26rem 0.12rem 0.12rem;
  padding: 0.16rem 0;
  background-color: #fff;
  border-radius: 0.08rem;
  box-shadow: 0 0.02rem 0.06rem 0 fade(#000, 3);

  .quick-link-item {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.05rem;
    cursor: pointer;

    .title {
      color: #444;
      font-weight: 400;
      font-size: 0.13rem;
      line-height: 1.5;
    }
  }
}
</style>
