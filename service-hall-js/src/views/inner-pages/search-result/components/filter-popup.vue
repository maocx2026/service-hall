<script lang="ts">
import { defineComponent, ref, reactive, onMounted, getCurrentInstance } from 'vue';
import _ from 'lodash';

import { namespaceT } from '@/helps/namespace-t';

import CommonFilterPopup from '@/components/business/common-filter-popup.vue';
import FilterBlockItem from './filter-block-item.vue';

import { createFilterModel, getSecondQueryFilterString } from '../helps/data';

export default defineComponent({
  components: {
    CommonFilterPopup,
    FilterBlockItem,
  },

  props: {
    model: {
      type: Object,
      default: () => {},
    },

    active: {
      type: Boolean,
      default: false,
    },

    dataSource: {
      type: Object,
      default: () => {},
    },
  },

  emits: [
    'on-search',
    'update:show',
    'update:active',
  ],

  setup(props, { emit }) {
    const vm = getCurrentInstance();
    const t = namespaceT('bookAdvanceBorrow.list');
    const queryModel = ref(props.model);

    const filterModel = reactive(createFilterModel());

    const columns = ref([
      {
        text: '全部图书馆',
        value: '',
      },
      {
        text: '深圳图书馆',
        value: '01',
      },
      {
        text: '宝安区图书馆',
        value: '02',
      },
      {
        text: '龙岗区图书馆',
        value: '03',
      },
      {
        text: '罗湖区图书馆',
        value: '04',
      },
      // TODO：等等
    ]);

    function onClosePopup() {
      emit('update:show', false);
    }

    function onConfirm() {
      const valu = getSecondQueryFilterString(filterModel);
      Object.assign(queryModel.value, {
        v_secondquery: valu,
      });
      onClosePopup();
      emit('on-search');
      emit('update:active', !!valu);
    }

    function onPopupReset() {
      Object.assign(filterModel, createFilterModel());
      emit('update:active', false);
    }

    onMounted(() => {
      const routeQuery = vm.proxy.$route.query;
      const filterRouteQuery = _.pick(routeQuery, Object.keys(filterModel));
      Object.assign(filterModel, filterRouteQuery);
    });

    return {
      t,
      queryModel,
      columns,
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
      v-model="filterModel.f_subject"
      :title="t('label.subject')"
      :options="dataSource.subject"
    />
    <FilterBlockItem
      v-model="filterModel.f_author"
      :title="t('label.author')"
      :options="dataSource.author"
    />
    <FilterBlockItem
      v-model="filterModel.classno"
      :title="t('label.classno')"
      :options="dataSource.classno"
    />
    <FilterBlockItem
      v-model="filterModel.publishyear"
      :title="t('label.publishyear')"
      :options="dataSource.publishyear"
    />
  </CommonFilterPopup>
</template>
