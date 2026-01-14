<script lang="ts">
import { defineComponent, computed, onMounted, ref, reactive } from 'vue';
import { List } from 'vant';

import { useList } from '@/uses/list';
import { openToastError } from '@/helps/toast';
import { namespaceT } from '@/helps/namespace-t';

import TitleFilter from '@/components/business/title-filter.vue';
import ListItem from './components/list-item.vue';
import FilterPopup from './components/filter-popup.vue';

import { SampleListData } from './helps/sample-data';
import { createFilterModel } from './helps/data';

export default defineComponent({
  components: {
    ListItem,
    VList: List,
    TitleFilter,
    FilterPopup,
  },

  setup() {
    const t = namespaceT('szlibBookList.collection');
    const tm = namespaceT('common');
    const showFilterPopup = ref(false);
    const isFilterActive = ref(false);
    const model = reactive(createFilterModel());
    const filterLibraryOptions = ref([]);

    function formatDistrictlist(districtList) {
      return districtList.map((area, idx) => {
        let children = [];
        if (area.InsideServiceAddr) {
          children = area.InsideServiceAddr.map((lib) => ({
            ...lib,
            text: lib.note,
            id: lib.name,
          }));
        } else {
          children = [
            {
              text: area.notes,
              id: 'borrowed',
            },
          ];
        }
        return {
          id: idx,
          text: area.notes,
          borrowed: !area.InsideServiceAddr,
          children,
        };
      });
    }

    async function loadData(): Promise<CommonApiListData> {
      try {
        // TODO:查询馆藏数据
        console.log('查询条件：model', model);
        const { districtList } = SampleListData;
        filterLibraryOptions.value = formatDistrictlist(districtList);
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
      isFilterActive,
      filterLibraryOptions,

      onLoad,
      onClickFilter,
      onConfirmSearchModel,
    };
  },
});
</script>

<template>
  <div class="inner-page">
    <TitleFilter
      :title="t('title.allCollection')"
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
        v-for="item in items"
        :key="`item-${item.id}`"
        :content="item"
      />
    </VList>

    <FilterPopup
      v-model:show="showFilterPopup"
      v-model:model="model"
      v-model:active="isFilterActive"
      :options="filterLibraryOptions"
      @on-confirm="onConfirmSearchModel"
    />
  </div>
</template>
