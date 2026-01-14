<script lang="ts">
import { defineComponent, toRef } from 'vue';

import { namespaceT } from '@/helps/namespace-t';

import CommonFilterPopup from '@/components/business/common-filter-popup.vue';
import MonthRangePicker from '@/components/business/month-range-picker';
import FilterRadio from '@/components/business/filter-radio.vue';

import { getFintypeOptions } from '../helps/data';

export default defineComponent({
  components: {
    CommonFilterPopup,
    MonthRangePicker,
    FilterRadio,
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
  },

  emits: [
    'on-confirm',
    'on-reset',
    'update:show',
    'update:active',
  ],

  setup(props, { emit }) {
    const t = namespaceT('myFinance');
    const queryModel = toRef(props, 'model');

    function onPopupConfirm() {
      emit('on-confirm');
      emit('update:active', true);
    }

    function onPopupReset() {
      emit('on-reset');
      emit('update:active', false);
    }

    function onClickCloseIcon() {
      emit('update:show', false);
    }

    return {
      t,
      queryModel,
      filtypeOptions: getFintypeOptions(),

      onPopupConfirm,
      onPopupReset,
      onClickCloseIcon,
    };
  },
});
</script>

<template>
  <CommonFilterPopup
    :title="t('title.filter')"
    v-bind="$attrs"
    @on-confirm="onPopupConfirm"
    @on-reset="onPopupReset"
    @click-close-icon="onClickCloseIcon"
  >
    <MonthRangePicker
      v-model="queryModel.dateRange"
      :label="t('label.selectDate')"
    />

    <FilterRadio
      v-model="queryModel.fintype"
      :label="t('label.fintype')"
      :options="filtypeOptions"
      class="mt-28"
    />
  </CommonFilterPopup>
</template>
