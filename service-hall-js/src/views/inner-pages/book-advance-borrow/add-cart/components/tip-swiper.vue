<script lang="ts">
import { defineComponent } from 'vue';
import { Swipe, SwipeItem } from 'vant';

import { namespaceT } from '@/helps/namespace-t';

export default defineComponent({
  components: {
    VSwipe: Swipe,
    VSwipeItem: SwipeItem,
  },

  setup() {
    const t = namespaceT('bookAdvanceBorrow.cart');

    return {
      t,
    };
  },
});
</script>

<template>
  <div class="tip-container">
    <div class="title">
      {{ t('tip.title') }}
    </div>
    <VSwipe
      vertical
      class="notice-swipe"
      :autoplay="3000"
      :touchable="false"
      :show-indicators="false"
    >
      <VSwipeItem>{{ t('tip.content[0]') }}</VSwipeItem>
      <VSwipeItem>{{ t('tip.content[1]') }}</VSwipeItem>
      <VSwipeItem>{{ t('tip.content[2]') }}</VSwipeItem>
    </VSwipe>
  </div>
</template>

<style lang="less" scoped>
.notice-swipe {
  height: 0.17rem;
  color: #777;
  font-weight: 400;
  font-size: 0.12rem;
  line-height: 0.17rem;
}

.tip-container {
  height: 0.62rem;
  margin-top: 0.12rem;
  padding: 0.12rem 0.14rem;
  border-radius: 0.08rem;
  background-color: #f8f8f8;

  .title {
    margin-bottom: 0.04rem;
    color: var(--primary-color);
    font-weight: 500;
    font-size: 0.12rem;
  }
}
</style>
