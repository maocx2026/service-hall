<script lang="ts">
import { defineComponent, toRef } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: String,
      default: '',
    },
  },

  emits: [
    'update:modelValue',
  ],

  setup(props, { emit }) {
    const model = toRef(props, 'modelValue');

    function onClickRadioItem({ value }) {
      emit('update:modelValue', value);
    }

    return {
      model,

      onClickRadioItem,
    };
  },
});
</script>

<template>
  <div class="filter-radio-wrap">
    <div class="label">
      {{ label }}
    </div>

    <div class="radio-list">
      <div
        v-for="item in options"
        :key="item.value"
        class="radio-item"
        :class="{'active': item.value === model}"
        @click="onClickRadioItem(item)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.filter-radio-wrap {
  background-color: #fff;

  .label {
    margin-bottom: 0.16rem;
    padding-left: 0.04rem;
    color: #222;
    font-weight: 500;
    font-size: 0.16rem;
    line-height: 1.45;
  }

  .radio-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.1rem;

    .radio-item {
      min-width: calc((100% - 0.2rem) / 3);
      height: 0.34rem;
      padding: 0 0.14rem;
      color: #777;
      font-weight: 400;
      font-size: 0.13rem;
      text-align: center;
      line-height: 0.34rem;
      border-radius: 0.17rem;
      border: 1px solid #e6e6e6;

      &.active {
        color: #fff;
        background-color: var(--primary-color);
        border-color: var(--primary-color);
      }
    }
  }
}
</style>
