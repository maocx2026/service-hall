<script lang="ts">
import { defineComponent, reactive, computed, onMounted, ref } from 'vue';
import { List } from 'vant';

import { useList } from '@/uses/list';
import { openToastError } from '@/helps/toast';
import { namespaceT } from '@/helps/namespace-t';
import { V_INDEX_CODE } from '@/consts/opac-fields';

import FloatBookCartBtn from '@/components/business/float-book-cart-btn.vue';
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
    FloatBookCartBtn,
  },

  setup() {
    const tm = namespaceT('common');
    const t = namespaceT('newBookCart.list');
    const expressBookCartNum = ref(0);

    const model = reactive({
      v_index: V_INDEX_CODE.TITLE, // 搜索索引
      v_value: '', // 关键字
      cate: '', // 分类
      isAll: false, // 全部
      isCarefullSelected: false, // 精选
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
      // TODO:查询快递书车数量
      expressBookCartNum.value = 10;
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
      t,
      tm,
      model,
      items,
      list,
      loading,
      finished,
      expressBookCartNum,

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

    <FloatBookCartBtn :num="expressBookCartNum" />
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
