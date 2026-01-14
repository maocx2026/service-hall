<script lang="ts">
import { defineComponent, toRef, ref, computed } from 'vue';

import { namespaceT } from '@/helps/namespace-t';

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
  },

  emits: [
    'update:modelValue',
  ],

  setup(props, { emit }) {
    const t = namespaceT('bookAdvanceBorrow.list');
    const model = toRef(props, 'modelValue');
    const isExpend = ref(false);
    const btnListRef = ref();

    function onToggleExpend() {
      isExpend.value = !isExpend.value;
    }

    function onSelectItem({ value }) {
      emit('update:modelValue', value);
    }

    const isShowExpendBtn = computed(() => {
      return btnListRef.value?.offsetHeight > 78;
    });

    return {
      t,
      model,
      isExpend,
      btnListRef,
      isShowExpendBtn,

      onSelectItem,
      onToggleExpend,
    };
  },
});
</script>

<template>
  <div class="filter-block-item">
    <div class="title-box">
      <div class="title">
        {{ title }}
      </div>
      <div
        v-if="isShowExpendBtn"
        class="expend-shrink"
        @click="onToggleExpend"
      >
        {{ isExpend ? t('btn.shrink') : t('btn.expend') }}
        <div
          class="spirte spirte-bottom-triangle-gray"
          :class="{'rotate': isExpend}"
        />
      </div>
    </div>

    <div
      class="btn-list-wrapper"
      :class="{'expend': isExpend}"
    >
      <div
        ref="btnListRef"
        class="btn-list"
      >
        <div
          v-for="item in options"
          :key="item.value"
          class="btn-item"
          :class="{'active': item.value === model}"
          @click="onSelectItem(item)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.filter-block-item {
  margin-bottom: 0.3rem;
}

.title-box {
  display: flex;
  align-content: center;
  justify-content: space-between;
  margin-bottom: 0.1rem;

  .title {
    color: #222;
    font-weight: 500;
    font-size: 0.16rem;
    line-height: 1.45;
  }

  .expend-shrink {
    display: flex;
    align-items: center;
    gap: 0.04rem;
    color: #777;
    font-weight: 400;
    font-size: 0.13rem;
    cursor: pointer;

    .spirte-bottom-triangle-gray {
      transition: all 0.2s linear;

      &.rotate {
        transform: rotate(-180deg);
      }
    }
  }
}

.btn-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.1rem 0.08rem;

  .btn-item {
    min-width: calc((100% - 0.16rem) / 3);
    height: 0.34rem;
    padding: 0 0.1rem;
    color: #777;
    font-weight: 400;
    font-size: 0.13rem;
    text-align: center;
    line-height: 0.34rem;
    border-radius: 0.17rem;
    border: 1px solid #e6e6e6;

    &.active {
      color: #fff;
      background-color: var(--primary-color);
      border-color: var(--primary-color);
    }
  }
}

.btn-list-wrapper {
  height: 0.78rem;
  overflow: hidden;
  transition: all 0.2s linear;

  &.expend {
    height: auto;
  }
}
</style>
