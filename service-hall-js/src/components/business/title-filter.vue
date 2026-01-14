<script lang="ts">
import { defineComponent } from 'vue';

import { namespaceT } from '@/helps/namespace-t';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },

    active: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'on-filter',
  ],

  setup(props, { emit }) {
    const t = namespaceT('myFinance');

    function onClickFilter() {
      emit('on-filter');
    }

    return {
      t,

      onClickFilter,
    };
  },
});
</script>

<template>
  <div class="title-filter">
    <div class="title">
      {{ title }}
    </div>

    <div
      class="filter"
      :class="{'active': active}"
      @click="onClickFilter"
    >
      {{ t('title.filter') }}
      <div
        class="spirte"
        :class="{
          'spirte-bottom-triangle-gray': !active,
          'spirte-bottom-triangle-blue': active,
        }"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.title-filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.1rem;
  padding: 0 0.08rem;

  .title {
    color: #212121;
    font-weight: 500;
    font-size: 0.16rem;
  }

  .filter {
    display: flex;
    align-items: center;
    gap: 0.05rem;
    color: #777;
    font-weight: 400;
    font-size: 0.15rem;

    &.active {
      color: var(--primary-color);
    }
  }
}
</style>
