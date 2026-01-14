<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Popup, Picker } from 'vant';

import SquareCheckBox from '@/components/business/square-checkbox.vue';

import { namespaceT } from '@/helps/namespace-t';
import { createCateColumns } from '../helps/data';

export default defineComponent({
  components: {
    SquareCheckBox,
    VPopup: Popup,
    VPicker: Picker,
  },

  props: {
    modelValue: {
      type: Object,
      default: () => {},
    },
  },

  emits: [
    'on-search',
    'on-change-cate',
  ],

  setup(props, { emit }) {
    const t = namespaceT('newBookCart.list');
    const model = ref(props.modelValue);
    const cateText = ref(t('cate'));
    const showPicker = ref(false);

    const columns = ref(createCateColumns());

    function onSearch() {
      emit('on-search');
    }

    function onClickCate() {
      showPicker.value = true;
    }

    function onClosePicker() {
      showPicker.value = false;
    }

    function onConfirm({ selectedOptions }) {
      const { text, value } = selectedOptions[0];
      cateText.value = text;
      Object.assign(model.value, {
        cate: value,
      });
      onClosePicker();
      onSearch();
    }

    return {
      t,
      model,
      cateText,
      showPicker,
      columns,

      onSearch,
      onClickCate,
      onClosePicker,
      onConfirm,
    };
  },
});
</script>

<template>
  <div class="cont-top-filter-wrap">
    <div
      class="cate-item"
      @click="onClickCate"
    >
      {{ cateText }}
      <div class="spirte spirte-bottom-triangle-gray" />
    </div>

    <div class="checkbox-list">
      <SquareCheckBox
        v-model="model.isCarefullSelected"
        @change="onSearch"
      >
        {{ t('isCarefullSelected') }}
      </SquareCheckBox>
      <SquareCheckBox
        v-model="model.isAll"
        @change="onSearch"
      >
        {{ t('isAll') }}
      </SquareCheckBox>
    </div>

    <VPopup
      v-model:show="showPicker"
      position="bottom"
      class="sh-vant-popup-bottom"
      :close-on-click-overlay="false"
    >
      <VPicker
        :columns="columns"
        :option-height="54"
        @confirm="onConfirm"
        @cancel="onClosePicker"
      />
    </VPopup>
  </div>
</template>

<style lang="less" scoped>
.cont-top-filter-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 0.52rem;
  padding: 0.2rem 0.2rem 0.1rem;
}

.cate-item {
  display: flex;
  align-items: center;
  gap: 0.04rem;
  color: #212121;
  font-weight: 500;
  font-size: 0.16rem;
  line-height: 1.45;
}

.checkbox-list {
  display: flex;
  align-items: center;
  gap: 0.16rem;
}
</style>
