<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';

import { onClickLink } from '@/helps/navigation';
import { QuickLinkData } from '@/types/quick-link';


export default defineComponent({
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },

  setup(props: { content: QuickLinkData }) {
    const vm = getCurrentInstance();

    function onClickQuickLink() {
      onClickLink(vm.proxy.$router, props.content);
    }

    return {
      onClickQuickLink,
    };
  },
});
</script>

<template>
  <div
    class="quick-link-item"
    @click="onClickQuickLink"
  >
    <div
      class="spirte"
      :class="content.icon"
    />
  </div>
</template>

<style lang="less" scoped>
.quick-link-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 0.36rem;
  height: 0.36rem;
  border: 1px solid #fff;
  border-radius: 50%;
  background-color: fade(#fff, 70);
  cursor: pointer;
}
</style>
