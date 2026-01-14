<script lang="ts">
import { defineComponent, computed } from 'vue';
import { Progress } from 'vant';

import { namespaceT } from '@/helps/namespace-t';


export default defineComponent({
  components: {
    VProgress: Progress,
  },

  props: {
    label: {
      type: String,
      default: '',
    },
    point: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  },

  emits: [
    'on-help',
  ],

  setup(props, { emit }) {
    const t = namespaceT('points.read');

    const percentage = computed(() => {
      return (props.point / props.total) * 100;
    });

    function onClickHelp() {
      emit('on-help');
    }

    return {
      t,
      percentage,

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
    <VProgress
      :percentage="percentage"
      stroke-width="8"
      :show-pivot="false"
      class="sh-vant-progress"
    />
  </div>
</template>

<style lang="less" scoped>
.point-item {
  margin-bottom: 0.08rem;
  padding-top: 0.16rem;

  .label {
    display: flex;
    align-items: center;
    gap: 0.04rem;
    color: #444;
    font-weight: 400;
    font-size: 0.14rem;
  }
}

.sh-vant-progress {
  margin-top: 0.08rem;

  :deep(.van-progress__portion) {
    background: linear-gradient(282deg, #4D6EF6 17.02%, #4162D3 100%);
  }
}
</style>
