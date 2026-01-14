<script lang="ts">
import { defineComponent, toRef, computed, ref } from 'vue';
import { Search } from 'vant';

import { namespaceT } from '@/helps/namespace-t';

export default defineComponent({
  components: {
    VSearch: Search,
  },

  props: {
    modelValue: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {
    const t = namespaceT('discover');
    const queryModel = toRef(props, 'modelValue');

    const isFocus = ref(false);

    const displayPlaceholder = computed(() => {
      const place = t('keyword');
      if (isFocus.value) {
        return place;
      }
      return `${'\ue710'} ${place}`;
    });

    function handleFocus() {
      isFocus.value = true;
    }

    function handleBlur() {
      if (!queryModel.value.keyword.length) {
        isFocus.value = false;
      }
    }

    function handleCancel() {
      isFocus.value = false;
    }

    return {
      t,
      queryModel,
      displayPlaceholder,
      isFocus,

      handleFocus,
      handleBlur,
      handleCancel,
    };
  },
});
</script>

<template>
  <VSearch
    v-model="queryModel.keyword"
    :placeholder="t('keyword')"
    class="discover-search-input van-icon"
    v-bind="$attrs"
  >
    <template #left-icon>
      <div class="spirte spirte-search" />
    </template>
  </VSearch>
</template>

<style lang="less" scoped>
.discover-search-input {
  height: 0.36rem;
  padding: 0;
  margin: 0 0.16rem;
  overflow: hidden;
  border-radius: 0.2rem;
  background-color: #fff;

  :deep(.van-search__content) {
    background-color: #fff;
    border-radius: 0.2rem;
    border: 0.005rem solid #d9d9d9;
  }

  :deep(.van-field__control) {
    &::placeholder {
      color: #878787;
      font-size: 0.12rem;
      line-height: 0.36rem;
    }
  }
}
</style>
