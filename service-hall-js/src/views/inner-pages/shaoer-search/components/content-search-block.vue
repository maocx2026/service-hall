<script lang="ts">
import { defineComponent, ref } from 'vue';

import { namespaceT } from '@/helps/namespace-t';

import BookCatePopup from './book-cate-popup.vue';
import BelongLibraryPopup from './belong-library-popup.vue';
import FilterPopup from './filter-popup.vue';


export default defineComponent({
  components: {
    BookCatePopup,
    BelongLibraryPopup,
    FilterPopup,
  },

  props: {
    modelValue: {
      type: Object,
      default: () => {},
    },

    facetFilterData: {
      type: Object,
      default: () => {},
    },
  },

  emits: [
    'on-search',
  ],

  setup(props, { emit }) {
    const model = ref(props.modelValue);
    const t = namespaceT('bookAdvanceBorrow.list');

    const showBookCatePopup = ref(false);
    const showBelongLibraryPopup = ref(false);
    const showFilterPopup = ref(false);

    const isBookCateActive = ref(false);
    const isBelongLibraryActive = ref(false);
    const isFilterActive = ref(false);

    function onSearch() {
      emit('on-search');
    }

    function onShowBookCatePopup() {
      showBookCatePopup.value = true;
    }

    function onShowBelongLibraryPopup() {
      showBelongLibraryPopup.value = true;
    }

    function onShowFilterPopup() {
      showFilterPopup.value = true;
    }

    return {
      t,
      model,
      showBookCatePopup,
      showBelongLibraryPopup,
      showFilterPopup,
      isBookCateActive,
      isBelongLibraryActive,
      isFilterActive,

      onSearch,
      onShowBookCatePopup,
      onShowBelongLibraryPopup,
      onShowFilterPopup,
    };
  },
});
</script>

<template>
  <div class="content-search-wrap">
    <div
      class="filter-item"
      :class="{'active': isBookCateActive}"
      @click="onShowBookCatePopup"
    >
      {{ t('label.bookCate') }}
      <div
        class="spirte"
        :class="{
          'rotate': showBookCatePopup,
          'spirte-bottom-triangle-gray': !isBookCateActive,
          'spirte-bottom-triangle-blue': isBookCateActive,
        }"
      />
    </div>
    <div class="line" />
    <div
      class="filter-item"
      :class="{'active': isBelongLibraryActive}"
      @click="onShowBelongLibraryPopup"
    >
      {{ t('label.library') }}
      <div
        class="spirte"
        :class="{
          'rotate': showBelongLibraryPopup,
          'spirte-bottom-triangle-gray': !isBelongLibraryActive,
          'spirte-bottom-triangle-blue': isBelongLibraryActive,
        }"
      />
    </div>
    <div class="line" />
    <div
      class="filter-item"
      :class="{'active': isFilterActive}"
      @click="onShowFilterPopup"
    >
      {{ t('label.filter') }}
      <div
        class="spirte"
        :class="{
          'rotate': showFilterPopup,
          'spirte-bottom-triangle-gray': !isFilterActive,
          'spirte-bottom-triangle-blue': isFilterActive,
        }"
      />
    </div>
  </div>

  <BookCatePopup
    v-model="showBookCatePopup"
    v-model:model="model"
    v-model:active="isBookCateActive"
    :options="facetFilterData.tablename"
    @on-search="onSearch"
  />
  <BelongLibraryPopup
    v-model="showBelongLibraryPopup"
    v-model:model="model"
    v-model:active="isBelongLibraryActive"
    :options="facetFilterData.library"
    @on-search="onSearch"
  />
  <FilterPopup
    v-model:show="showFilterPopup"
    v-model:model="model"
    v-model:active="isFilterActive"
    :data-source="facetFilterData"
    @on-search="onSearch"
  />
</template>

<style lang="less" scoped>
.content-search-wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 0.1rem;

  .filter-item {
    display: flex;
    align-items: center;
    gap: 0.05rem;
    color: #777;
    font-weight: 400;
    font-size: 0.15rem;

    &.active {
      color: var(--primary-color);
    }
  }

  .line {
    width: 0.005rem;
    height: 0.16rem;
    background-color: fade(#000, 10);
  }

  .spirte-bottom-triangle-gray,
  .spirte-bottom-triangle-blue {
    transition: all 0.2s linear;

    &.rotate {
      transform: rotate(-180deg);
    }
  }
}
</style>
