<script lang="ts">
  import { defineComponent, reactive, computed, onMounted, onUnmounted,ref, getCurrentInstance } from 'vue';
  import _ from 'lodash';
  import { List } from 'vant';

  import { useList } from '@/uses/list';
  import { openToastError } from '@/helps/toast';
  import { namespaceT } from '@/helps/namespace-t';
  import { V_INDEX_CODE } from '@/consts/opac-fields';

  import FloatBookCartBtn from '@/components/business/float-book-cart-btn.vue';
  import PageTopSearch from './components/page-top-search.vue';
  import ContentSearchBlock from './components/content-search-block.vue';
  import FilterPopup from './components/filter-popup.vue'; // 根据实际路径调整

  import ListItem from './components/book-item.vue';
  import {getAgeTags, getClass1Class2_ByAge} from '@/api/appdic';
  import { useKeepAliveCache } from '@/uses/useKeepAliveCache';
  import { fetchBookListByFilter, resetBookPagination } from './helps/data';

  import { onActivated } from 'vue';

  import { SampleListData, FacetQueryDataSource } from './helps/sample-data';
  import {
    createFacetFilterModel,
    handleSecondQueryFilterString,
    getSecondQueryFilterString, class2OptionsAll,
  } from './helps/data';



  export default defineComponent({
    name: 'ShaoerSearch',
    components: {
      PageTopSearch,
      ListItem,//这里把 book-item.vue 注册为 ListItem
      VList: List,
      FloatBookCartBtn,
      ContentSearchBlock,
      FilterPopup,
    },

    props: {
      active: {
        type: Boolean,
        default: false,
      },
    },

    setup() {

      const vm = getCurrentInstance();
      const tm = namespaceT('common');
      const t = namespaceT('bookAdvanceBorrow.list');
      const expressBookCartNum = ref(0);
      const routeQuery = { ...vm.proxy.$route.query };
      const facetFilterModel = reactive(createFacetFilterModel());

     // const bookList = ref([]); // 定义响应式变量
      /* ===== 分页状态 ===== */
      const bookList = ref<any[]>([]);
      const currentPage = ref(1);
      const pageSize = 10;
      const loading = ref(false);
      const finished = ref(false);

      /* ===== 下滑加载 ===== */
      async function onLoad() {
        // 正在加载中，避免重复触发
        if (loading.value) return;
        loading.value = true;

        const newData = await fetchBookListByFilter(facetFilterModel, currentPage.value, pageSize);

        if (newData.length) {
          bookList.value.push(...newData);
          currentPage.value += 1;
        }

        // 核心：只有**本次返回空**且**之前已加载过数据**才认为"真的没有更多了"
        if (newData.length < pageSize) {
          finished.value = true;
        }

        loading.value = false;
      }

      /* ===== 搜索/筛选后重置 ===== */
      function onSearch() {

        resetBookPagination(bookList, currentPage, finished, loading);

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









      const model = reactive({
        v_index: routeQuery.v_index || V_INDEX_CODE.TITLE, // 搜索索引
        v_value: routeQuery.v_value || '', // 关键字
        v_tablearray: routeQuery.v_tablearray || 'bibliosm,serbibm,apabibibm,mmbibm,', // 图书类型
        library: routeQuery.library || 'all', // 所属图书馆
        v_secondquery: getSecondQueryFilterString(routeQuery), // 二级检索
        cirtype: 'local_reserve',
      });


      const state = reactive({
        model: {
          v_index: 'title',
          v_value: '',
          v_tablearray: 'bibliosm,serbibm,apabibibm,mmbibm,',
          library: 'all',
          v_secondquery: '',
          cirtype: 'local_reserve',
        },
        bookList: [] as any[],
        facetFilterModel: {
          age: [] as any[],
          class1: [] as any[],
          class2: [] as any[],
        },
      });


      useKeepAliveCache('ShaoerSearch', state);
      onActivated(() => {
        // ✅ 恢复状态后，重新请求数据
        refresh();
      });


      // 监听子组件传递的书目列表
      const handleUpdateBookList = (newList) => {
       // debugger; // 看是否进入断点
     //   console.log('① 父组件收到书目', newList);   // ← 看这行
        bookList.value = newList;
      };
      
      onMounted(() => {
        vm.proxy.$eventBus.on('booklist-update', handleUpdateBookList);
      });

      onUnmounted(() => {
        vm.proxy.$eventBus.off('booklist-update', handleUpdateBookList);
      });


      async function refresh() {
        /* 1. 恢复状态后，重新请求列表 */
        list.refresh();

        /* 2. 如果已经恢复过 facetFilterModel，就不要再初始化 */
        if (facetFilterModel.age.length === 0) {
          try {
            const ageRes = await getAgeTags();
            const raw = ageRes.data?.ageTags || [];
            facetFilterModel.age = raw.map((item: any) => ({
              title: item.label,
              value: item.label
            }));
          } catch (e) {
            console.error('拉取年龄标签失败', e);
          }

          try {
            const { data } = await getClass1Class2_ByAge([]);
            facetFilterModel.class1 = data.class1List.map((v: string) => ({ title: v, value: v }));
            facetFilterModel.class2 = data.class2List.map((v: string) => ({ title: v, value: v }));
          } catch (e) {
            console.error('初始化分类失败', e);
          }
        }
      }



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
      /*
          function refresh() {
            list.refresh();
            // TODO:查询快递书车数量
            expressBookCartNum.value = 10;
            // TODO:分面检索
            Object.assign(facetFilterModel, FacetQueryDataSource);
          }
      */



      /*
      async function onLoad() {
        const newData = await fetchBookListByFilter(facetFilterModel, currentPage.value, pageSize);

        if (newData.length > 0) {
          bookList.value.push(...newData);
          currentPage.value++;
        } else {
          finished.value = true;
        }

        loading.value = false;
      }
*/
      onMounted(() => {
        refresh();
      });






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
        bookList, // 将 bookList 返回到模板中
        handleUpdateBookList, // 将处理函数返回到模板中
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

    <FilterPopup
      :model="model"
      :active="active"
      :dataSource="facetFilterModel"
      @booklist-update="handleUpdateBookList"
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
          v-for="item in bookList"
          :key="`item-${item.metaid}`"
          :content="item.jo_detail || {}"
          :content-tag="item.content_tag || ''"
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
