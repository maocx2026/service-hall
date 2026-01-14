<script lang="ts">
import { defineComponent, computed, onMounted, ref, reactive } from 'vue';
import { List } from 'vant';

import { useList } from '@/uses/list';
import { openToastError } from '@/helps/toast';
import { namespaceT } from '@/helps/namespace-t';

import TitleFilter from '@/components/business/title-filter.vue';
import ListItem from './sign-history-item.vue';
import SignHistoryFilterPopup from './sign-history-filter-popup.vue';

import { SignHistorySampleListData } from '../helps/sample-data';
import { createHistoryFilterModel, handleSearchModel } from '../helps/handle-data';

export default defineComponent({
  components: {
    ListItem,
    VList: List,
    TitleFilter,
    SignHistoryFilterPopup,
  },

  setup() {
    const t = namespaceT('activitySign');
    const tm = namespaceT('common');
    const showFilterPopup = ref(false);
    const isFilter = ref(false);
    const model = reactive(createHistoryFilterModel());

    function onResetSearchModel() {
      Object.assign(model, createHistoryFilterModel());
    }

    async function loadData(): Promise<CommonApiListData> {
      try {
        // TODO:查询我的签到历史数据
        console.log('查询条件：model', handleSearchModel(model));
        return SignHistorySampleListData;
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

    function onClickFilter() {
      showFilterPopup.value = true;
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
      showFilterPopup,
      model,
      isFilter,

      onLoad,
      onResetSearchModel,
      onConfirmSearchModel,
      onClickFilter,
    };
  },
});
</script>

<template>
  <div class="content-wrap">
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
      />
    </VList>

    <SignHistoryFilterPopup
      v-model:show="showFilterPopup"
      v-model:model="model"
      v-model:active="isFilter"
      @on-reset="onResetSearchModel"
      @on-confirm="onConfirmSearchModel"
    />
  </div>
</template>
