
<script lang="ts">
  import { defineComponent, ref, reactive, onMounted, getCurrentInstance,computed } from 'vue';
  import _ from 'lodash';
  import { namespaceT } from '@/helps/namespace-t';
  import CommonFilterPopup from '@/components/business/common-filter-popup.vue';
  import FilterBlockItem from './filter-block-item.vue';
  import { normalizeArray, createFilterModel, getSecondQueryFilterString } from '../helps/data';
  import { searchByTags } from '@/api/appdic';
  import { watch } from 'vue';
  import { getClass1Class2_ByAge } from '@/api/appdic';
  import { fetchClass2Options } from '../helps/data';

  export default defineComponent({
    components: { CommonFilterPopup, FilterBlockItem },
    props: {
      model: { type: Object, default: () => ({}) },
      active: { type: Boolean, default: false },
      dataSource: { type: Object, default: () => ({}) },
    },
    emits: ['on-search', 'update:show', 'update:active', 'booklist-update'],
    setup(props, { emit }) {
      const vm = getCurrentInstance()!;
      const t = namespaceT('bookAdvanceBorrow.list');

      /* 防止外部把 dataSource 传成 null */
      if (!props.dataSource) {
        (props as any).dataSource = { age: [], class1: [], class2: [] };
      }


      /* ---------- 响应式数据 ---------- */
      const queryModel = ref(props.model);
      const filterModel = reactive(createFilterModel());
      const lastActiveFilterModel = reactive(createFilterModel());

      /* ---------- 工具函数 ---------- */
      const emitBookList = (list: any[]) =>
        vm.proxy!.$eventBus.emit('booklist-update', list);

      /* 核心：统一应用筛选 */
      async function applyFilter() {
        const valu = getSecondQueryFilterString(filterModel);
        Object.assign(queryModel.value, { v_secondquery: valu });
        Object.assign(lastActiveFilterModel, _.cloneDeep(filterModel));

        try {
          const result = await searchByTags(filterModel.class2, filterModel.age);
          emitBookList(result.data.data);
        } catch (e) {
          console.error('获取书目列表失败:', e);
        }
        emit('update:active', !!valu);
      }


      /* 1. 年龄变化 → 重新拉一、二级主题 */
      watch(
        () => filterModel.age,
        async ageList => {
          const ages = Array.isArray(ageList) ? ageList : [];
          const { data } = await getClass1Class2_ByAge(ages);

          /* 兜底 */
          if (!props.dataSource) return;
          props.dataSource.class1.splice(0, Infinity, ...(data.class1List || []).map((v: string) => ({ title: v, value: v })));
          props.dataSource.class2.splice(0, Infinity, ...(data.class2List || []).map((v: string) => ({ title: v, value: v })));
        },
        { immediate: true }   // 第一次也触发
      );

      /* 2. 一级主题变化 → 重新拉二级主题 */
      watch(
        () => filterModel.class1,
        async newVal => {
          const list = Array.isArray(newVal) ? newVal : [];
          const class2 = list.length
            ? (await fetchClass2Options(list, filterModel.age)).map((v: string) => ({ title: v, value: v }))
            : [];   // 空数组代表“不限”

          if (!props.dataSource) return;
          props.dataSource.class2 = class2;

          /* 去掉已选但不在新列表里的二级项 */
          const validSet = new Set(class2.map(i => i.value));
          filterModel.class2 = filterModel.class2.filter((v: string) => validSet.has(v));
        },
        { immediate: true }
      );

      /* ---------- 生命周期 ---------- */
      onMounted(async () => {
        const routeQuery = vm.proxy!.$route.query;
        Object.assign(filterModel, {
          ..._.pick(routeQuery, Object.keys(filterModel)),
          age: normalizeArray(routeQuery.age),
          class1: normalizeArray(routeQuery.class1),
          class2: normalizeArray(routeQuery.class2),
        });
        Object.assign(lastActiveFilterModel, _.cloneDeep(filterModel));

        /* 只要 URL 带了任意筛选参数就自动搜索 */
        const hasFilter =
          filterModel.age.length || filterModel.class1.length || filterModel.class2.length;
        if (hasFilter) await applyFilter();
      });

      /* ---------- 事件处理 ---------- */
      function onClosePopup() {
        Object.assign(filterModel, lastActiveFilterModel);
        emit('update:show', false);
      }

      async function onConfirm() {
        await applyFilter();          // 统一调用
        emit('on-search');            // 保留原有事件
        emit('update:show', false);
      }

      function onPopupReset() {
        Object.assign(filterModel, createFilterModel(), {
          age: [],
          class1: [],
          class2: [],
        });
        emit('update:active', false);
      }

      return {
        t,
        queryModel,
        filterModel,
        onClosePopup,
        onConfirm,
        onPopupReset,
      };
    },
  });
</script>


<template>
  <CommonFilterPopup
    :title="t('label.filter')"
    v-bind="$attrs"
    @on-confirm="onConfirm"
    @on-reset="onPopupReset"
    @click-close-icon="onClosePopup"
  >
    <FilterBlockItem
      v-model="filterModel.age"
      :title="t('label.age')"
      :options="dataSource.age|| []"
    />
    <FilterBlockItem
      v-model="filterModel.class1"
      :title="t('label.class1')"
      :options="dataSource.class1|| []"
    />
    <FilterBlockItem
      v-model="filterModel.class2"
      :title="t('label.class2')"
      :options="dataSource.class2|| []"
    />

  </CommonFilterPopup>
</template>
