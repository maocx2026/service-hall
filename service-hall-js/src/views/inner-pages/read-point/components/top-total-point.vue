<script lang="ts">
import { defineComponent } from 'vue';

import { namespaceT } from '@/helps/namespace-t';

export default defineComponent({
  props: {
    points: {
      type: Number,
      default: 0,
    },
  },

  setup() {
    const t = namespaceT('points.read');

    return {
      t,
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
            {{ t('totalPoint') }}
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
  background: url("@/assets/img/read-point-bg.png") no-repeat;
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
      color: #f28d45;
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
