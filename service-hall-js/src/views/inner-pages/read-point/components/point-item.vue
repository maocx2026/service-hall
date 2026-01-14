<script lang="ts">
import { defineComponent } from 'vue';

import { namespaceT } from '@/helps/namespace-t';


export default defineComponent({
  props: {
    label: {
      type: String,
      default: '',
    },
    point: {
      type: Number,
      default: 0,
    },
  },

  emits: [
    'on-help',
  ],

  setup(props, { emit }) {
    const t = namespaceT('points.read');

    function onClickHelp() {
      emit('on-help');
    }

    return {
      t,

      onClickHelp,
    };
  },
});
</script>

<template>
  <div class="point-item">
    <div class="label">
      {{ label }}
      <div
        class="spirte spirte-help"
        @click="onClickHelp"
      />
    </div>
    <template v-if="point">
      <div class="point">
        {{ point }}
        <span class="unit">
          {{ t('pointUnit') }}
        </span>
      </div>
    </template>
    <div
      v-else
      class="no-points"
    >
      {{ t('noPoints') }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.point-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 0.56rem;

  &:not(:last-child) {
    border-bottom: 0.005rem solid fade(#000, 7);
  }

  .label {
    display: flex;
    align-items: center;
    gap: 0.04rem;
    color: #444;
    font-weight: 400;
    font-size: 0.14rem;
  }

  .point {
    color: #fd7617;
    font-weight: 500;
    font-size: 0.24rem;

    .unit {
      font-weight: 600;
      font-size: 0.14rem;
    }
  }

  .no-points {
    color: #fd7617;
    font-weight: 600;
    font-size: 0.14rem;
  }
}
</style>
