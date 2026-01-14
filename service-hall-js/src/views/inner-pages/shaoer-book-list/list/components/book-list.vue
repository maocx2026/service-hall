<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { List } from 'vant';

import { useList } from '@/uses/list';
import { openToastError } from '@/helps/toast';
import { namespaceT } from '@/helps/namespace-t';

import BookItem from './book-item.vue';

import { SampleListData } from '../helps/sample-data';

export default defineComponent({
  components: {
    VList: List,
    BookItem,
  },

  props: {
    options: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {
    const tm = namespaceT('common');

    async function loadData(): Promise<CommonApiListData> {
      try {
        // TODO:查询深图书单列表数据
        console.log('modelValue', props.options);
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

    function onClickDetail() {
      // TODO：去到图书详情页（新书直通车详情页）
    }

    return {
      tm,
      items,
      loading,
      finished,

      onLoad,
      onClickDetail,
      refresh,
    };
  },
});
</script>

<template>
  <VList
    :loading="loading"
    :finished="finished"
    :finished-text="tm('hint.noMore')"
    class="book-list"
    @load="onLoad"
  >
    <BookItem
      v-for="(item, idx) in items"
      :key="`book-${item.id}`"
      :content="item"
      :idx="idx"
      @click="onClickDetail(item)"
    />
  </VList>
</template>

<style lang="less" scoped>
.book-list {
  padding: 0 0.12rem;
}
</style>
