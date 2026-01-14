<script lang="ts">
import { defineComponent, computed, onMounted, ref, reactive } from 'vue';
import { List } from 'vant';

import { useList } from '@/uses/list';
import { openToastError } from '@/helps/toast';
import { namespaceT } from '@/helps/namespace-t';

import TitleFilter from '@/components/business/title-filter.vue';
import ListItem from './list-item.vue';
import FinaceHistoryFilterPopup from './finace-history-filter-popup.vue';

import { SampleListData } from '../helps/sample-data';
import { createHistoryFilterModel, handleSearchModel } from '../helps/handle-data';

export default defineComponent({
  components: {
    ListItem,
    VList: List,
    TitleFilter,
    FinaceHistoryFilterPopup,
  },

  setup() {
    const tm = namespaceT('common');
    const t = namespaceT('myFinance');
    const showFilterPopup = ref(false);
    const isFilterActive = ref(false);

    const model = reactive(createHistoryFilterModel());

    function onResetSearchModel() {
      Object.assign(model, createHistoryFilterModel());
    }

    function onClickFilter() {
      showFilterPopup.value = true;
    }

    async function loadData(): Promise<CommonApiListData> {
      try {
        // TODO:查询我的财经历史数据
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
      showFilterPopup,
      model,
      isFilterActive,

      onLoad,
      onClickFilter,
      onResetSearchModel,
      onConfirmSearchModel,
    };
  },
});
</script>

<template>
  <div class="content-wrap">
    <TitleFilter
      :title="t('title.historyDetail')"
      :active="isFilterActive"
      @on-filter="onClickFilter"
    />

    <VList
      :loading="loading"
      :finished="finished"
      :finished-text="tm('hint.noMore')"
      @load="onLoad"
    >
      <ListItem
        v-for="(item, idx) in items"
        :key="`item-${item.id}`"
        :content="item"
        :idx="idx"
      />
    </VList>

    <FinaceHistoryFilterPopup
      v-model:show="showFilterPopup"
      v-model:model="model"
      v-model:active="isFilterActive"
      @on-reset="onResetSearchModel"
      @on-confirm="onConfirmSearchModel"
    />
  </div>
</template>
