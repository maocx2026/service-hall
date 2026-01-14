<script lang="ts">
import { defineComponent, computed, onMounted, reactive } from 'vue';
import { List, ActionSheet } from 'vant';

import { useList } from '@/uses/list';
import { openToastError } from '@/helps/toast';
import { namespaceT } from '@/helps/namespace-t';

import ListItem from './self-and-loan-list-item.vue';

import { getSampleListData } from '../helps/sample-data';


export default defineComponent({
  components: {
    ListItem,
    VList: List,
    VActionSheet: ActionSheet,
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

    const orderType = reactive({
      showAction: false,
      value: 'ALL',
      text: t('orderType.all'),
      actions: [
        { name: t('orderType.all'), value: 'ALL' },
        { name: t('orderType.notComplete'), value: 'NOT_COMPLETE' },
      ],
    });

    async function loadData(): Promise<CommonApiListData> {
      try {
        // TODO:查询我的自取或是调阅数据数据
        console.log('type', props.type);
        console.log('orderType', orderType.value);
        return getSampleListData(props.type);
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

    function onOrderTypeSelect({ name, value }) {
      Object.assign(orderType, {
        value,
        text: name,
      });
      refresh();
    }

    function onClickOrderType() {
      orderType.showAction = true;
    }

    return {
      t,
      tm,
      items,
      list,
      loading,
      finished,
      orderType,

      onLoad,
      refresh,
      onOrderTypeSelect,
      onClickOrderType,
    };
  },
});
</script>


<template>
  <div class="content-wrap">
    <div
      class="order-type"
      :class="{'show': orderType.showAction}"
      @click="onClickOrderType"
    >
      {{ orderType.text }}
      <div class="spirte spirte-bottom-triangle-gray1" />
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

    <VActionSheet
      v-model:show="orderType.showAction"
      :actions="orderType.actions"
      :cancel-text="$t('common.action.cancel')"
      close-on-click-action
      :title="t('label.orderType')"
      :closeable="false"
      class="vant-action-sheet"
      @select="onOrderTypeSelect"
    />
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
  cursor: pointer;

  &.show {
    .spirte-bottom-triangle-gray1 {
      transform: rotate(-180deg);
    }
  }
}
</style>
