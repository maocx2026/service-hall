<script lang="ts">
import { defineComponent, ref } from 'vue';

import { createCateDatas } from '../helps/data';

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      default: () => {},
    },
  },

  emits: [
    'toggle-expend',
    'change',
  ],

  setup(props, { emit }) {
    const isExpend = ref(false);

    function onClickCate({ code }) {
      emit('change', code);
    }

    function toggleExpend() {
      isExpend.value = !isExpend.value;
      emit('toggle-expend', isExpend.value);
    }

    return {
      cateList: createCateDatas(),
      isExpend,

      onClickCate,
      toggleExpend,
    };
  },
});
</script>

<template>
  <div
    class="cate-list-wrap"
    :class="{'expend': isExpend}"
  >
    <div class="cate-list">
      <div
        v-for="item in cateList"
        :key="item.code"
        class="cate-item"
        :class="{'active': modelValue.cate === item.code}"
        @click="onClickCate(item)"
      >
        {{ item.title }}
      </div>
    </div>

    <div
      class="expend-btn"
      @click="toggleExpend"
    >
      <span v-if="isExpend">
        {{ $t('szlibBookList.btns.shrink') }}
      </span>
      <span v-else>
        {{ $t('szlibBookList.btns.expend') }}
      </span>
      <div
        class="spirte spirte-bottom-triangle"
        :class="{'expend': isExpend}"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.cate-list-wrap {
  position: relative;
  width: 100vw;
  height: 1.36rem;
  padding: 0.16rem;
  padding-right: 0.72rem;
  padding-bottom: 0.74rem;
  background: linear-gradient(311deg, #4060d0 -3.29%, #4d6ef6 51.72%, #4162d3 104.58%);
  transition: all 0.2s ease-in;

  .cate-list {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    gap: 0.08rem;
    width: 100%;
    padding-bottom: 0.6rem;
    overflow-y: hidden;
    overflow-x: auto;
  }

  &.expend {
    height: 2.13rem;
    padding-right: 0.48rem;
    padding-bottom: 0.24rem;

    .cate-list {
      align-items: flex-start;
      gap: 0.12rem 0.06rem;
      flex-wrap: wrap;
      padding-bottom: 0;
    }
  }
}

.cate-item {
  height: 0.3rem;
  padding: 0 0.12rem;
  color: #fff;
  font-weight: 400;
  font-size: 0.13rem;
  line-height: 0.3rem;
  background-color: fade(#fff, 10);
  white-space: nowrap;
  border-radius: 0.2rem;
  transition: all 0.2s ease-in;

  &.active {
    color: var(--primary-color);
    background-color: #fff;
  }
}

.expend-btn {
  position: absolute;
  top: 0.18rem;
  right: 0;
  display: flex;
  align-items: center;
  gap: 0.04rem;
  height: 0.28rem;
  padding: 0 0.16rem;
  color: #fff;
  font-weight: 400;
  font-size: 0.13rem;
  line-height: 0.28rem;
  cursor: pointer;
}

.spirte-bottom-triangle {
  transform: rotate(0);

  &.expend {
    transform: rotate(180deg);
  }
}
</style>
