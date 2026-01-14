<script lang="ts">
import { defineComponent, reactive, computed, onMounted, ref, getCurrentInstance } from 'vue';
import _ from 'lodash';
import { List } from 'vant';

import { useList } from '@/uses/list';
import { openToastError } from '@/helps/toast';
import { namespaceT } from '@/helps/namespace-t';
import { V_INDEX_CODE } from '@/consts/opac-fields';

import FloatBookCartBtn from '@/components/business/float-book-cart-btn.vue';
import PageTopSearch from './components/page-top-search.vue';
import ContentSearchBlock from './components/content-search-block.vue';
import ListItem from './components/book-item.vue';

import { SampleListData, FacetQueryDataSource } from './helps/sample-data';
import {
  createFacetFilterModel,
  handleSecondQueryFilterString,
  getSecondQueryFilterString,
} from './helps/data';

export default defineComponent({
  components: {
    PageTopSearch,
    ListItem,
    VList: List,
    FloatBookCartBtn,
    ContentSearchBlock,
  },

  setup() {
    const vm = getCurrentInstance();
    const tm = namespaceT('common');
    const t = namespaceT('bookAdvanceBorrow.list');
    const expressBookCartNum = ref(0);
    const routeQuery = { ...vm.proxy.$route.query };
    const facetFilterModel = reactive(createFacetFilterModel());

    const model = reactive({
      v_index: routeQuery.v_index || V_INDEX_CODE.TITLE, // 搜索索引
      v_value: routeQuery.v_value || '', // 关键字
      v_tablearray: routeQuery.v_tablearray || 'bibliosm,serbibm,apabibibm,mmbibm,', // 图书类型
      library: routeQuery.library || 'all', // 所属图书馆
      v_secondquery: getSecondQueryFilterString(routeQuery), // 二级检索
      cirtype: 'local_reserve',
    });

    async function loadData(): Promise<CommonApiListData> {
      try {
        // TODO:图书查询列表数据
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



    function refresh() {
      list.refresh();
      // TODO:查询快递书车数量
      expressBookCartNum.value = 10;
      // TODO:分面检索
      Object.assign(facetFilterModel, FacetQueryDataSource);
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
      vm.proxy.$router.replace({
        name: vm.proxy.$route.name,
        query: {
          ...routeQuery,
          ..._.omit(model, ['v_secondquery']),
          ...handleSecondQueryFilterString(model.v_secondquery),
        },
      });
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
      facetFilterModel,

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
      <ContentSearchBlock
        v-model="model"
        :facet-filter-data="facetFilterModel"
        @on-search="onSearch"
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
    </div>

    <FloatBookCartBtn :num="expressBookCartNum" />
  </div>
</template>

<style lang="less" scoped>
.cont-wrapper {
  height: calc(100vh - 0.68rem);
  margin-top: -0.21rem;
  padding: 0.16rem 0.12rem 0.2rem;
  overflow: auto;
  background-color: #f7f8ff;
  border-radius: 0.24rem 0.24rem 0 0;
}
</style>
