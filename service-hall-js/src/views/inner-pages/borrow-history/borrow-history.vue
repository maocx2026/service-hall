<script lang="ts">
import { defineComponent, computed, onMounted, ref, reactive } from 'vue';
import { List } from 'vant';

import { useList } from '@/uses/list';
import { openToastError } from '@/helps/toast';
import { namespaceT } from '@/helps/namespace-t';

import TitleFilter from '@/components/business/title-filter.vue';
import ListItem from './components/list-item.vue';
import ScorePopup from './components/score-popup.vue';
import BorrowHistoryFilterPopup from './components/borrow-history-filter-popup.vue';

import { SampleListData } from './helps/sample-data';
import { createHistoryFilterModel, handleSearchModel } from './helps/handle-data';

export default defineComponent({
  components: {
    ListItem,
    VList: List,
    TitleFilter,
    ScorePopup,
    BorrowHistoryFilterPopup,
  },

  setup() {
    const t = namespaceT('borrowHistory');
    const tm = namespaceT('common');
    const showFilterPopup = ref(false);
    const isFilter = ref(false);
    const model = reactive(createHistoryFilterModel());
    const scorePopup = reactive({
      shown: false,
      payload: {
        id: 0,
      },
    });

    function onResetSearchModel() {
      Object.assign(model, createHistoryFilterModel());
    }

    async function loadData(): Promise<CommonApiListData> {
      try {
        // TODO:查询我的借阅历史数据
        console.log('查询条件：model', handleSearchModel(model));
        return SampleListData;
      } catch (error) {
        openToastError(error.message);
        throw error;
      }
    }

    const list = useList({
      fetch: loadData,
    });

    const items = computed(() => {
      return list.data.value;
    });

    async function refresh() {
      await list.refresh();
    }

    function onLoad() {
      list.load();
    }

    onMounted(() => {
      refresh();
    });

    const loading = computed(() => {
      return list.loading.value;
    });

    const finished = computed(() => {
      return list.finished.value;
    });

    function onClickScore(item) {
      Object.assign(scorePopup, {
        shown: true,
        payload: item,
      });
    }

    function onClickFilter() {
      showFilterPopup.value = true;
    }

    function onCloseScorePopup() {
      scorePopup.shown = false;
    }

    function onConfirmSearchModel() {
      showFilterPopup.value = false;
      refresh();
    }

    return {
      t,
      tm,
      items,
      list,
      loading,
      finished,
      scorePopup,
      showFilterPopup,
      model,
      isFilter,

      onLoad,
      onClickScore,
      onClickFilter,
      onCloseScorePopup,
      onResetSearchModel,
      onConfirmSearchModel,
    };
  },
});
</script>

<template>
  <div class="inner-page">
    <TitleFilter
      :title="t('title.historyDetail')"
      :active="isFilter"
      @on-filter="onClickFilter"
    />

    <VList
      :loading="loading"
      :finished="finished"
      :finished-text="tm('hint.noMore')"
      @load="onLoad"
    >
      <ListItem
        v-for="item in items"
        :key="`item-${item.id}`"
        :content="item"
        @on-score="onClickScore(item)"
      />
    </VList>

    <ScorePopup
      v-model="scorePopup.shown"
      :payload="scorePopup.payload"
      @on-close="onCloseScorePopup"
    />

    <BorrowHistoryFilterPopup
      v-model:show="showFilterPopup"
      v-model:model="model"
      v-model:active="isFilter"
      @on-reset="onResetSearchModel"
      @on-confirm="onConfirmSearchModel"
    />
  </div>
</template>
