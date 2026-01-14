<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import format from 'date-fns/format';

import { namespaceT } from '@/helps/namespace-t';

import LoadingComp from '@/components/common/loading-comp.vue';
import PeopleInLibTable from './components/people-in-lib-table.vue';
import TitleBar from './components/title-bar.vue';
import TodayBorrowReturnComp from './components/today-borrow-return.vue';
import EchartPie from './components/echart-pie.vue';

import {
  LibPeopleData,
  TodayBorrowReturn,
  TodayBorrowData,
  TodayReturnData,
} from './helps/sample-data';

export default defineComponent({
  components: {
    LoadingComp,
    PeopleInLibTable,
    TitleBar,
    TodayBorrowReturnComp,
    EchartPie,
  },

  setup() {
    const td = namespaceT('dateFormat');
    const t = namespaceT('szlibData');
    const loading = ref(false);

    const today = computed(() => {
      const now = new Date();
      return format(now, td('date'));
    });

    return {
      t,
      loading,
      today,

      LibPeopleData,
      TodayBorrowReturn,
      TodayBorrowData,
      TodayReturnData,
    };
  },
});
</script>


<template>
  <LoadingComp v-if="loading" />
  <div
    v-else
    class="data-overview-page"
  >
    <div class="top-selected-date">
      <div class="spirte spirte-calendar-white" />
      <div class="today">
        {{ today }}
      </div>
    </div>
    <div class="data-body">
      <!-- 在馆人数 -->
      <PeopleInLibTable :data-source="LibPeopleData" />
      <!-- 今日借还文献量 -->
      <TitleBar :title="t('title.borrowReturn')" />
      <TodayBorrowReturnComp :data-source="TodayBorrowReturn" />

      <div class="echart-wrap">
        <EchartPie
          :data-source="TodayBorrowData"
          :total-num="TodayBorrowReturn[0].num"
          :title="t('title.borrowTotal')"
        />
      </div>

      <div class="echart-wrap">
        <EchartPie
          :data-source="TodayReturnData"
          :total-num="TodayBorrowReturn[1].num"
          :title="t('title.returnTotal')"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.top-selected-date {
  display: flex;
  align-items: center;
  gap: 0.08rem;
  height: 1.41rem;
  padding: 0.2rem 0.2rem 0.97rem;
  color: #fff;
  font-weight: 700;
  font-size: 0.2rem;
  background: linear-gradient(311deg, #4060d0 -3.29%, #4d6ef6 51.72%, #4162d3 104.58%);
  border-bottom-right-radius: 0.24rem;
  border-bottom-left-radius: 0.24rem;
}

.data-body {
  margin-top: -0.81rem;
  padding: 0 0.12rem 0.3rem;
}

.echart-wrap {
  margin-top: 0.08rem;
  padding: 0.16rem;
  border-radius: 0.08rem;
  background-color: #fff;
}
</style>
