<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { List } from 'vant';

/// <reference types="../../../../../types/common-api" />

import { useList } from '@/uses/list';
import { openToastError } from '@/helps/toast';
import { namespaceT } from '@/helps/namespace-t';

import ListItem from './express-list-item.vue';

import { ExpressSampleListData } from '../helps/sample-data';


export default defineComponent({
  components: {
    ListItem,
    VList: List,
  },

  props: {
    type: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const tm = namespaceT('common');
    const t = namespaceT('myAdvanceBorrowLoad');

    async function loadData(): Promise<CommonApiListData> {
      try {
        // TODO:查询快递列表数据
        console.log('type', props.type);
        return ExpressSampleListData;
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
      refresh,
    };
  },
});
</script>


<template>
  <div class="content-wrap">
    <div class="order-type">
      {{ t('orderType.all') }}
    </div>

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
        @reload="refresh"
      />
    </VList>
  </div>
</template>

<style lang="less" scoped>
.order-type {
  display: flex;
  align-items: center;
  gap: 0.05rem;
  margin-bottom: 0.1rem;
  padding-left: 0.08rem;
  color: #212121;
  font-weight: 500;
  font-size: 0.16rem;
  line-height: 1.45;
}
</style>
