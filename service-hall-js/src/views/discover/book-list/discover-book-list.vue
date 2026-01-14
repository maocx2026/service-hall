<script lang="ts">
import { defineComponent, reactive, computed, onMounted } from 'vue';
import { List } from 'vant';

/// <reference types="../../../../types/common-api" />

import { useList } from '@/uses/list';
import { openToastError } from '@/helps/toast';
import { namespaceT } from '@/helps/namespace-t';

import PageTopSearch from './components/page-top-search.vue';
import ContentTopFilter from './components/content-top-filter.vue';
import ListItem from './components/book-item.vue';

import { SampleListData } from './helps/sample-data';


export default defineComponent({
  components: {
    PageTopSearch,
    ContentTopFilter,
    ListItem,
    VList: List,
  },

  setup() {
    const tm = namespaceT('common');

    const model = reactive({
      keyword: '', // 关键字
    });

    async function loadData(): Promise<CommonApiListData> {
      try {
        // TODO:查询我的借阅数据
        console.log('model', model);
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

    function onSearch() {
      refresh();
    }

    return {
      tm,
      model,
      items,
      list,
      loading,
      finished,

      onSearch,
      onLoad,
      refresh,
    };
  },
});
</script>


<template>
  <div>
    <PageTopSearch
      v-model="model"
      @on-search="onSearch"
    />

    <div class="cont-wrapper">
      <ContentTopFilter
        v-model="model"
        @on-search="onSearch"
      />
      <div class="list-wrap">
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
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.cont-wrapper {
  height: calc(100vh - 0.68rem);
  margin-top: -0.21rem;
  overflow: auto;
  background-color: #f7f8ff;
  border-radius: 0.24rem 0.24rem 0 0;
}

.list-wrap {
  height: calc(100% - 0.52rem);
  padding: 0 0.12rem 0.2rem;
  overflow: auto;
}
</style>
