<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    menus: {
      type: Array,
      default: () => [],
    },
  },

  emits: [
    'on-click-item',
  ],

  setup(props, { emit }) {
    function onClickMenu(item) {
      emit('on-click-item', item);
    }

    return {
      onClickMenu,
    };
  },
});
</script>


<template>
  <div class="menu-page">
    <slot />
    <div
      v-for="item in menus"
      :key="item.key"
      class="menu-item"
      @click="onClickMenu(item)"
    >
      <div class="title">
        {{ item.title }}
      </div>

      <div class="spirte spirte-menu-arrow" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.menu-page {
  padding: 0.12rem;

  .menu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 0.49rem;
    margin-bottom: 0.01rem;
    padding-left: 0.16rem;
    padding-right: 0.12rem;
    border-radius: 0.04rem;
    background-color: #fff;
    cursor: pointer;

    .title {
      flex: 1;
      color: #444;
      font-weight: 400;
      font-size: 0.14rem;
    }
  }
}
</style>
