<script lang="ts">
import { defineComponent, reactive, onMounted, ref, getCurrentInstance } from 'vue';

import { openToastError } from '@/helps/toast';
import { RouterName as RN } from '@/config/router';
import { push } from '@/helps/navigation';

import LoadingComp from '@/components/common/loading-comp.vue';


export default defineComponent({
  components: {
    LoadingComp,
  },

  setup() {
    const vm = getCurrentInstance();
    const loading = ref(false);
    const model = reactive({
      readPoints: 36,
      creditePoints: 296,
    });

    function onClickReadPoint() {
      push(vm.proxy.$router, {
        name: RN.ReadPoint,
      });
    }

    function onClickCreditPoint() {
      push(vm.proxy.$router, {
        name: RN.CreditPoint,
      });
    }

    function onLoadData() {
      try {
        loading.value = true;
        // TODO:查询信用积分
        console.log('model', model);
      } catch (error) {
        openToastError(error.message);

        throw error;
      } finally {
        loading.value = false;
      }
    }

    onMounted(() => {
      onLoadData();
    });

    return {
      model,
      loading,

      onClickReadPoint,
      onClickCreditPoint,
    };
  },
});
</script>


<template>
  <LoadingComp v-if="loading" />
  <div
    v-else
    class="credit-list-page"
  >
    <div
      class="credit-item"
      @click="onClickCreditPoint"
    >
      <div class="label">
        {{ $t('mine.creditPoint') }}
      </div>

      <div class="value-box">
        <div class="value">
          {{ model.creditePoints }}

          <span class="unit">
            {{ $t('mine.points') }}
          </span>
        </div>
        <div class="spirte spirte-menu-arrow" />
      </div>
    </div>
    <div
      class="credit-item"
      @click="onClickReadPoint"
    >
      <div class="label">
        {{ $t('mine.readPoint') }}
      </div>

      <div class="value-box">
        <div class="value">
          {{ model.readPoints }}

          <span class="unit">
            {{ $t('mine.points') }}
          </span>
        </div>
        <div class="spirte spirte-menu-arrow" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.credit-list-page {
  padding: 0.12rem;

  .credit-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 0.7rem;
    margin-bottom: 0.08rem;
    padding: 0.16rem;
    background-color: #fff;
    border-radius: 0.08rem;

    .label {
      color: #444;
      font-weight: 400;
      font-size: 0.14rem;
    }

    .value-box {
      display: flex;
      align-items: center;
      gap: 0.12rem;

      .value {
        display: flex;
        align-items: center;
        color: var(--primary-color);
        font-weight: 600;
        font-size: 0.22rem;

        .unit {
          margin-left: 0.04rem;
          font-size: 0.14rem;
        }
      }
    }
  }
}
</style>
