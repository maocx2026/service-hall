<script lang="ts">
import { defineComponent, toRef, ref } from 'vue';
import { TreeSelect } from 'vant';

import { namespaceT } from '@/helps/namespace-t';

import CommonFilterPopup from '@/components/business/common-filter-popup.vue';

export default defineComponent({
  components: {
    CommonFilterPopup,
    VTreeSelect: TreeSelect,
  },

  props: {
    model: {
      type: Object,
      default: () => {},
    },
    options: {
      type: Array,
      default: () => [],
    },
    active: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'on-confirm',
    'update:show',
    'update:active',
  ],

  setup(props, { emit }) {
    const t = namespaceT('szlibBookList.collection');
    const queryModel = toRef(props, 'model');
    const activeId = ref(1);
    const activeIndex = ref(0);

    function onPopupConfirm() {
      emit('on-confirm');
      emit('update:active', true);
    }

    function onClickCloseIcon() {
      emit('update:show', false);
    }

    function onClickTreeItem({ name }) {
      queryModel.value.library = name;
      onPopupConfirm();
    }

    return {
      t,
      queryModel,
      activeId,
      activeIndex,

      onPopupConfirm,
      onClickCloseIcon,
      onClickTreeItem,
    };
  },
});
</script>

<template>
  <CommonFilterPopup
    :title="t('title.filter')"
    :show-action="false"
    no-padding
    v-bind="$attrs"
    @click-close-icon="onClickCloseIcon"
  >
    <VTreeSelect
      v-model:active-id="activeId"
      v-model:main-active-index="activeIndex"
      :items="options"
      class="sh-vant-tree-select"
      @click-item="onClickTreeItem"
    />
  </CommonFilterPopup>
</template>

<style lang="less" scoped>
.sh-vant-tree-select{
  :deep(.van-sidebar-item) {
    height: 0.54rem;
    padding: 0.16rem 0 0.16rem 0.2rem;
    color: #777;
    font-weight: 400;
    font-size: 0.15rem;
    line-height: 1.45;
    transition: all 0.2s ease;

    &::before {
      width: 0.02rem;
      height: 100%;
    }
  }

  :deep(.van-sidebar-item--select) {
    color: var(--primary-color);
    font-weight: 600;
  }

  :deep(.van-tree-select__item) {
    height: 0.54rem;
    padding: 0.16rem 0 0.16rem 0.2rem;
    color: #444;
    font-weight: 400;
    font-size: 0.15rem;
    line-height: 1.45;
  }

  :deep(.van-tree-select__item--active) {
    color: var(--primary-color);
    font-weight: 600;
  }

  :deep(.van-tree-select__selected) {
    display: none;
  }
}
</style>
