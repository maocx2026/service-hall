<script lang="ts">
import { defineComponent, computed } from 'vue';

import { namespaceT } from '@/helps/namespace-t';

export default defineComponent({
  props: {
    points: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    const t = namespaceT('points.credit');

    // 分数 > 700 ，信用极好
    // 700>=分数 > 500,  信用优秀
    // 500>=分数 > 300,  信用良好
    // 300>=分数 > 100,  信用一般
    // 分数 <= 100, 信用较差
    const pointLevel = computed(() => {
      if (props.points > 700) {
        return t('pointLevel.best');
      }
      if (props.points > 500) {
        return t('pointLevel.better');
      }
      if (props.points > 300) {
        return t('pointLevel.good');
      }
      if (props.points > 100) {
        return t('pointLevel.common');
      }
      return t('pointLevel.poor');
    });

    return {
      t,
      pointLevel,
    };
  },
});
</script>

<template>
  <div class="top-total-points">
    <div class="total-points-wrap">
      <div class="point-wrap">
        <template v-if="points">
          <div class="points">
            {{ points }}
            <span class="unit">
              {{ t('pointUnit') }}
            </span>
          </div>
          <div class="label">
            {{ pointLevel }}
          </div>
        </template>
        <div
          v-else
          class="no-points"
        >
          {{ t('noPoints') }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.top-total-points {
  height: 2.32rem;
  border-radius: 0 0 0.24rem 0.24rem;
  overflow: hidden;
  background: url("@/assets/img/credit-point-bg.png") no-repeat;
  background-size: 100%;

  .total-points-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.12rem;
    height: 1.89rem;
    margin: 0.07rem auto 0;
    background: url("@/assets/img/point-bg.png") no-repeat;
    background-size: 100%;

    .point-wrap {
      color: var(--primary-color);
      text-align: center;

      .points {
        margin-bottom: 0.05rem;
        font-weight: 700;
        font-size: 0.32rem;
        line-height: 1;

        .unit {
          margin-left: -0.04rem;
          font-weight: 500;
          font-size: 0.12rem;
        }
      }

      .label {
        font-weight: 500;
        font-size: 0.14rem;
      }

      .no-points {
        font-weight: 700;
        font-size: 0.18rem;
      }
    }
  }
}
</style>
