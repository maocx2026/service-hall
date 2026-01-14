<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue';
import { Checkbox, Button } from 'vant';

import { namespaceT } from '@/helps/namespace-t';
import { openToastError } from '@/helps/toast';

import LoadingComp from '@/components/common/loading-comp.vue';
import PointDeductionHelpPopup from './point-deduction-help-popup.vue';

import { FeeSampleData } from '../helps/sample-data';

export default defineComponent({
  components: {
    LoadingComp,
    VCheckbox: Checkbox,
    VButton: Button,
    PointDeductionHelpPopup,
  },

  setup() {
    const t = namespaceT('myFinance');
    const loading = ref(false);
    const pointDeductionChecked = ref(false);
    const showPointDeductionHelpPopup = ref(false);
    const model = reactive({
      deposit: 0,
      advanceFee: 0,
      debt: 0,
      points: 0,
    });

    function onClickPointHelps() {
      showPointDeductionHelpPopup.value = true;
    }

    function onClosePointDeductionHelpPopup() {
      showPointDeductionHelpPopup.value = false;
    }

    function onClickPayDebt() {
      // TODO:欠款缴费
      // 1、微信打开 微信支付
      // 2、支付宝打开 支付宝支付
      // 3、网页打开 勾选积分可进行抵扣 积分大于等于欠款 自动进行抵扣 如小于 则弹窗提示：请在微信/支付宝打开此网页进行补缴欠款
    }

    function onLoaddata() {
      try {
        loading.value = true;
        // TODO：获取押金等数据
        Object.assign(model, FeeSampleData);
      } catch (error) {
        openToastError(error.message);
        throw error;
      } finally {
        loading.value = false;
      }
    }

    onMounted(() => {
      onLoaddata();
    });

    return {
      t,
      loading,
      pointDeductionChecked,
      model,
      showPointDeductionHelpPopup,

      onClickPointHelps,
      onClickPayDebt,
      onClosePointDeductionHelpPopup,
    };
  },
});
</script>

<template>
  <div class="content-wrap">
    <LoadingComp v-if="loading" />
    <template v-else>
      <div class="title">
        {{ t('title.depositAndAdvanceFee') }}
      </div>
      <div class="card">
        <div class="card-info-item">
          <div class="label">
            {{ t('label.deposit') }}
          </div>
          <div class="value">
            {{ model.deposit }} {{ t('label.yuan') }}
          </div>
        </div>
        <div class="card-info-item">
          <div class="label">
            {{ t('label.advanceFee') }}
          </div>
          <div class="value">
            {{ model.advanceFee }} {{ t('label.yuan') }}
          </div>
        </div>
      </div>
      <div class="title">
        {{ t('title.debt') }}
      </div>
      <div class="card pb-14">
        <div class="debt-item card-info-item">
          {{ t('text.debt[0]') }}
          <span class="red">
            {{ model.debt }}
          </span>
          {{ t('text.debt[1]') }}
        </div>

        <div class="point-item">
          <div class="spirte spirte-point-deduction" />
          <div class="info">
            <div class="title">
              {{ t('title.pointDeduction') }}
              <div
                class="spirte spirte-help"
                @click="onClickPointHelps"
              />
            </div>
            <div class="desc">
              {{ t('text.pointDeduction', { point: 2.5, fee: 2.5 }) }}
            </div>
          </div>

          <VCheckbox
            v-model="pointDeductionChecked"
            checked-color="#4D65CB"
            icon-size="18px"
          />
        </div>

        <VButton
          block
          type="primary"
          class="vant-primary-btn"
          @click="onClickPayDebt"
        >
          {{ t('action.pay') }}
        </VButton>
      </div>
    </template>

    <PointDeductionHelpPopup
      v-model="showPointDeductionHelpPopup"
      @on-close="onClosePointDeductionHelpPopup"
    />
  </div>
</template>

<style lang="less" scoped>
.title {
  margin-bottom: 0.1rem;
  padding-left: 0.08rem;
  color: #212121;
  font-weight: 500;
  font-size: 0.16rem;;
  line-height: 1.45;
}

.card {
  margin-bottom: 0.2rem;
  padding: 0 0.14rem;
  background-color: #fff;
  border-radius: 0.08rem;

  .card-info-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 0.5rem;
    color: #444;
    font-weight: 400;
    font-size: 0.14rem;

    &:not(:last-child) {
      border-bottom: 0.005rem solid fade(#000, 10);
    }
  }

  .debt-item {
    justify-content: flex-start;
    height: 0.6rem;
    border-bottom: 0.005rem solid fade(#000, 10);

    .red {
      margin: 0 0.06rem;
      color: var(--red-color);
      font-weight: 600;
      font-size: 0.22rem;
    }
  }

  .point-item {
    display: flex;
    align-items: center;
    height: 0.64rem;
    margin-bottom: 0.06rem;

    .info {
      flex: 1;
      margin: 0 0.12rem;
      line-height: 1.45;

      .title {
        display: flex;
        align-items: center;
        gap: 0.04rem;
        margin-bottom: 0.01rem;
        padding-left: 0;
        color: #222;
        font-weight: 400;
        font-size: 0.12rem;
      }

      .desc {
        color: #777;
        font-weight: 300;
        font-size: 0.11rem;
      }
    }
  }

  &.pb-14 {
    padding-bottom: 0.14rem;
  }
}
</style>
