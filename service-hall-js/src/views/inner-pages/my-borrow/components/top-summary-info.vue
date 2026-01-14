<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Button } from 'vant';

import { namespaceT } from '@/helps/namespace-t';
import { openToastError, openToastSuccess } from '@/helps/toast';

export default defineComponent({
  components: {
    VButton: Button,
  },

  props: {
    totalNum: {
      type: Number,
      default: 0,
    },
  },

  emits: [
    'reload',
  ],

  setup(props, { emit }) {
    const saving = ref(false);
    const t = namespaceT('myBorrow');

    function onClickRenewal() {
      try {
        saving.value = true;
        // TODO:一键续借
        console.log('TODO:一键续借');
        openToastSuccess(t('hint.renewSucc'));
        emit('reload');
      } catch (error) {
        openToastError(error.message);
        throw error;
      } finally {
        saving.value = false;
      }
    }

    return {
      t,
      saving,

      onClickRenewal,
    };
  },
});
</script>


<template>
  <div class="top-summary-info-wrap">
    <div class="left">
      <div class="label">
        {{ t('currentBorrowNum') }}
      </div>
      <div class="borrow-num">
        <span class="num">
          {{ totalNum }}
        </span>

        <span class="unit">
          {{ t('bookUnit') }}
        </span>
      </div>
    </div>
    <VButton
      type="primary"
      class="vant-primary-btn renewal-btn"
      :loading="saving"
      @click="onClickRenewal"
    >
      {{ t('renewal') }}
    </VButton>
  </div>
</template>

<style lang="less" scoped>
.top-summary-info-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 0.8rem;
  padding: 0.2rem;
  color: #dae0f9;
  background: linear-gradient(311deg, #4060d0 -3.29%, #4d6ef6 51.72%, #4162d3 104.58%);

  .left {
    font-weight: 400;
    font-size: 0.12rem;
    line-height: 1.4;

    .borrow-num .num {
      margin-top: 0.02rem;
      margin-right: 0.04rem;
      color: #fff;
      font-weight: 600;
      font-size: 0.2rem;
    }
  }
}

.renewal-btn {
  height: 0.4rem;
  font-size: 0.14rem;
  border-radius: 0.05rem;
  background-color: fade(#fff, 10);
  border: 0;
}
</style>
