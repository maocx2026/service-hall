<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { List } from 'vant';

import { useList } from '@/uses/list';
import { openToastError } from '@/helps/toast';
import { namespaceT } from '@/helps/namespace-t';

import ListItem from './components/list-item.vue';

import { SampleListData } from './helps/sample-data';


export default defineComponent({
  components: {
    ListItem,
    VList: List,
  },

  setup() {
    const t = namespaceT('recommendPurchase.list');
    const tm = namespaceT('common');

    async function loadData(): Promise<CommonApiListData> {
      try {
        // TODO:查询我的荐购列表数据
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

    return {
      t,
      tm,
      items,
      list,
      loading,
      finished,

      onLoad,
    };
  },
});
</script>


<template>
  <div class="inner-page">
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
  </div>
</template>
