<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue';

import { namespaceT } from '@/helps/namespace-t';
import { openToastError } from '@/helps/toast';

import LoadingComp from '@/components/common/loading-comp.vue';
import RadioBorrowType from './radio-borrow-type.vue';
import BorrowRuleTable from './borrow-rule-table.vue';

import { createBorrowTypeOptions, BorrowTypeCode, getBorrowTypeTxt } from '../helps/data';
import { getBorrowRuleInfoData } from '../helps/sample-data';

export default defineComponent({
  components: {
    RadioBorrowType,
    LoadingComp,
    BorrowRuleTable,
  },

  setup() {
    const t = namespaceT('myReadCard.serviceSearchOpen.borrowRule');
    const borrowType = ref(BorrowTypeCode.ZH_BORROW);
    const loading = ref(false);

    const borrowSummaryModel = reactive({
      cardType: '励读证',
      borrowType: getBorrowTypeTxt(borrowType.value),
      borrowNum: 1,
      totalNum: 1,
      data: [],
    });

    async function onSearch() {
      try {
        loading.value = true;
        // TODO:获取规则数据，以下仅为模拟数据
        const data = await getBorrowRuleInfoData(borrowType.value);

        Object.assign(borrowSummaryModel, {
          ...data,
          borrowType: getBorrowTypeTxt(borrowType.value),
        });
      } catch (error) {
        openToastError(error.message);
        throw error;
      } finally {
        loading.value = false;
      }
    }

    onMounted(() => {
      onSearch();
    });

    return {
      t,
      borrowSummaryModel,
      borrowType,
      loading,

      borrowTypeOptions: createBorrowTypeOptions(),

      onSearch,
    };
  },
});
</script>

<template>
  <div class="borrow-rule-info-wrap">
    <div class="title">
      {{ t('title') }}
    </div>

    <div class="borrow-rule-content">
      <RadioBorrowType
        v-model="borrowType"
        :options="borrowTypeOptions"
        @on-change="onSearch"
      />

      <LoadingComp v-if="loading" />
      <template v-else>
        <div class="tip-title title">
          {{ t('tipTitle', borrowSummaryModel) }}
        </div>
        <div class="tip">
          <div class="spirte spirte-warning" />
          {{ t('tip', { totalNum: borrowSummaryModel.totalNum }) }}
        </div>

        <BorrowRuleTable :data-source="borrowSummaryModel.data" />
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
.borrow-rule-info-wrap {
  margin-top: 0.2rem;

  .title {
    color: #222;
    font-weight: 600;
    font-size: 0.16rem;
  }

  .borrow-rule-content {
    margin-top: 0.1rem;
    padding: 0.14rem;
    border-radius: 0.08rem;
    background-color: #fff;

    .tip-title {
      margin-top: 0.14rem;
      margin-bottom: 0.04rem;
      font-size: 0.15rem;
    }

    .tip {
      display: flex;
      align-items: center;
      gap: 0.03rem;
      margin-bottom: 0.1rem;
      color: #777;
      font-weight: 400;
      font-size: 0.12rem;
    }
  }
}
</style>
