<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    options: {
      type: Array,
      default: () => {},
    },

    modelValue: {
      type: String,
      default: '',
    },
  },

  emits: [
    'update:modelValue',
    'on-change',
  ],

  setup(props, { emit }) {
    const value = ref(props.modelValue);

    function onSelectItem({ key }) {
      if (value.value !== key) {
        value.value = key;
        emit('update:modelValue', key);
        emit('on-change', key);
      }
    }

    return {
      value,

      onSelectItem,
    };
  },
});
</script>

<template>
  <div class="radio-list">
    <div
      v-for="item in options"
      :key="item.key"
      class="radio-item"
      :class="{'active': item.key === value}"
      @click="onSelectItem(item)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.radio-list {
  display: flex;
  align-items: center;
  gap: 0.08rem;

  .radio-item {
    height: 0.34rem;
    padding: 0 0.16rem;
    color: #777;
    font-weight: 400;
    font-size: 0.14rem;
    line-height: 0.34rem;
    border: 0.005rem solid fade(#000, 10);
    border-radius: 0.3rem;
    transition: all 0.2s ease;

    &.active {
      color: #fff;
      border: 0;
      background: linear-gradient(311deg, #4060d0 -3.29%, #4d6ef6 51.72%, #4162d3 104.58%);
    }
  }
}
</style>
