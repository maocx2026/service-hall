<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Checkbox } from 'vant';

export default defineComponent({
  components: {
    VCheckbox: Checkbox,
  },

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const model = ref(props.modelValue);

    return {
      model,
    };
  },
});
</script>

<template>
  <VCheckbox
    v-model="model"
    shape="square"
    checked-color="#4d65cb"
    :icon-size="12"
    class="sh-square-vant-checkbox"
    v-bind="$attrs"
  >
    <slot />

    <template #icon="props">
      <div
        v-if="props.checked"
        class="spirte spirte-square-checkbox-checked"
      />
      <div
        v-else
        class="spirte spirte-square-checkbox-uncheck"
      />
    </template>
  </VCheckbox>
</template>

<style lang="less" scoped>
// 方形checkbox
.sh-square-vant-checkbox {
  :deep(.van-checkbox__label) {
    margin-left: 0.05rem;
    color: #777;
    font-weight: 400;
    font-size: 0.14rem;
  }
}
</style>
