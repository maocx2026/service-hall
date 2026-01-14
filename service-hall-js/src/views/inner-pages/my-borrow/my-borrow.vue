<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { List } from 'vant';

import { useList } from '@/uses/list';
import { openToastError } from '@/helps/toast';
import { namespaceT } from '@/helps/namespace-t';

import ListItem from './components/list-item.vue';
import TopSummaryInfo from './components/top-summary-info.vue';

import { SampleListData } from './helps/sample-data';

export default defineComponent({
  components: {
    TopSummaryInfo,
    ListItem,
    VList: List,
  },

  setup() {
    const tm = namespaceT('common');

    async function loadData(): Promise<CommonApiListData> {
      try {
        // TODO:查询我的借阅数据
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

    const totalCount = computed(() => {
      return list.total.value;
    });

    return {
      tm,
      items,
      list,
      loading,
      finished,
      totalCount,

      onLoad,
      refresh,
    };
  },
});
</script>


<template>
  <div>
    <TopSummaryInfo
      :total-num="totalCount"
      @reload="refresh"
    />
    <div class="pl-12 pr-12 pt-12">
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
          @reload="refresh"
        />
      </VList>

      <div class="tip">
        <div class="spirte spirte-warning" />
        {{ $t('myBorrow.tip') }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.tip {
  padding: 0.12rem 0 0.3rem;
  color: #777;
  font-weight: 400;
  font-size: 0.12rem;
  line-height: 1.4;

  .spirte-warning {
    display: inline-block;
  }
}
</style>
