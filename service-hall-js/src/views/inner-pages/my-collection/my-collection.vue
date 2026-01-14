<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue';
import { List, ActionSheet } from 'vant';

import { useList } from '@/uses/list';
import { openToastError, openToastSuccess } from '@/helps/toast';
import { namespaceT } from '@/helps/namespace-t';

import CollectionItem from './components/collection-item.vue';

import { SampleListData } from './helps/sample-data';

export default defineComponent({
  components: {
    CollectionItem,
    VList: List,
    VActionSheet: ActionSheet,
  },

  setup() {
    const t = namespaceT('myCollection');
    const showAction = ref(false);
    const currentId = ref(0);
    const actions = [
      {
        name: t('action.del'),
        color: '#E84340',
        code: 'DEL',
      },
    ];

    async function loadData(): Promise<CommonApiListData> {
      try {
        // TODO:查询我的收藏数据
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

    function onClickMoreActions({ id }) {
      showAction.value = true;
      currentId.value = id;
    }

    function onRemove() {
      try {
        // TODO:执行删除逻辑
        console.log(currentId.value);
        openToastSuccess(t('hint.delSucc'));
        refresh();
      } catch (error) {
        openToastError(error.message);
        throw error;
      }
    }

    function onSelectActions({ code }) {
      if (code === 'DEL') {
        onRemove();
      }
    }

    function onClickDetail() {
      // TODO:去到图书详情页(图书预借的详情页)
    }

    return {
      t,
      items,
      list,
      loading,
      finished,
      showAction,
      actions,

      onLoad,
      onClickMoreActions,
      onSelectActions,
      onClickDetail,
    };
  },
});
</script>


<template>
  <div class="inner-page my-collection-list-wrap">
    <VList
      :loading="loading"
      :finished="finished"
      :finished-text="t('hint.noMore')"
      @load="onLoad"
    >
      <CollectionItem
        v-for="item in items"
        :key="`item-${item.id}`"
        :content="item"
        @on-more-action="onClickMoreActions(item)"
        @click="onClickDetail(item)"
      />
    </VList>

    <VActionSheet
      v-model:show="showAction"
      :actions="actions"
      :cancel-text="$t('common.action.cancel')"
      close-on-click-action
      :closeable="false"
      :round="false"
      class="vant-action-sheet-for-action"
      @select="onSelectActions"
    />
  </div>
</template>
