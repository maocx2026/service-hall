<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';
import { FloatingBubble, Badge } from 'vant';

import { push } from '@/helps/navigation';
import { RouterName as RN } from '@/config/router';

export default defineComponent({
  components: {
    VFloatingBubble: FloatingBubble,
    VBadge: Badge,
  },

  props: {
    num: {
      type: Number,
      default: 0,
    },
  },

  setup() {
    const vm = getCurrentInstance();

    function onGoToExpressBookCart() {
      push(vm.proxy.$router, {
        name: RN.ExpressBookCart,
      });
    }

    return {
      onGoToExpressBookCart,
    };
  },
});
</script>


<template>
  <VFloatingBubble
    class="book-cart-btn sh-float-bubble"
    @click="onGoToExpressBookCart"
  >
    <VBadge
      :content="num"
      :show-zero="false"
    >
      <div class="spirte spirte-shop-cart-white" />
    </VBadge>
  </VFloatingBubble>
</template>

<style lang="less">
.van-floating-bubble.book-cart-btn {
  right: 0.16rem;
  bottom: 0.32rem;
  width: 0.5rem;
  height: 0.5rem;
  overflow: visible;
  background-color: var(--primary-color);

  .van-badge {
    height: 0.21rem;
    min-width: 0.21rem;
    font-size: 0.11rem;
    line-height: 0.21rem;

    &.van-badge--top-right {
      transform: translate(90%, -90%);
    }
  }
}
</style>
