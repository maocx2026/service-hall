<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
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
  <div class="link-item">
    <div :class="`spirte ${content.icon}`" />
    <div class="title">
      {{ content.title }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.link-item {
  display: flex;
  align-items: center;
  gap: 0.08rem;
  width: 50%;
  height: 0.48rem;
  padding-left: 0.04rem;
  cursor: pointer;

  .title {
    color: #444;
    font-weight: 400;
    font-size: 0.13rem;
    line-height: 1.5;
  }

  &:nth-child(1),
  &:nth-child(2) {
    border-bottom: 0.5px solid #eaeaea;
  }
}
</style>
