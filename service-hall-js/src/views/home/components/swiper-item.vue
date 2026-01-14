<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';

import { onClickLink } from '@/helps/navigation';

export default defineComponent({
  props: {
    linkList: {
      type: Array,
      default: () => [],
    },
  },

  setup() {
    const vm = getCurrentInstance();

    function onClickQucikLink(item) {
      onClickLink(vm.proxy.$router, item);
    }

    return {
      onClickQucikLink,
    };
  },
});
</script>

<template>
  <div class="swiper-item-link">
    <div
      v-for="item in linkList"
      :key="item.key"
      class="link-item"
      @click="onClickQucikLink(item)"
    >
      <div :class="`spirte ${item.icon}`" />
      <div class="title">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.swiper-item-link {
  display: flex;
  flex-wrap: wrap;

  .link-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.05rem;
    width: 25%;
    padding-top: 0.16rem;

    .title {
      color: #444;
      font-weight: 400;
      font-size: 0.13rem;
      text-align: center;
    }
  }
}
</style>
