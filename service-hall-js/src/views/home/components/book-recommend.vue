<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import { openToastError } from '@/helps/toast';

import RecommendBookItem from './recommend-book-item.vue';

import { recommendData } from '../helps/sample-data';


export default defineComponent({
  components: {
    RecommendBookItem,
  },

  setup() {
    const recommendBooks = ref([]);

    function onClickRecommendMore() {
      console.log('TODO:跳转官网-推荐列表');
    }

    function onClickItem() {
      console.log('TODO:跳转官网-推荐详情');
    }

    function onLoadData() {
      try {
        // TODO:获取推荐列表数据
        recommendBooks.value = recommendData();
      } catch (error) {
        openToastError(error.message);
        throw error;
      }
    }

    onMounted(() => {
      onLoadData();
    });

    return {
      recommendBooks,

      onClickRecommendMore,
      onClickItem,
    };
  },
});
</script>

<template>
  <div class="book-recommend">
    <div class="title-wrapper">
      <div class="title">
        {{ $t('home.recommend') }}
      </div>
      <div
        class="more"
        @click="onClickRecommendMore"
      >
        <span>{{ $t('home.more') }}</span>
        <div class="spirte spirte-more-arrow" />
      </div>
    </div>

    <div class="book-wrapper">
      <RecommendBookItem
        v-for="item in recommendBooks"
        :key="`recommend-book${item.id}`"
        :content="item"
        @click="onClickItem"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.book-recommend {
  margin-top: 0.2rem;
  padding: 0 0.16rem;
}

.title-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.07rem;

  .title {
    color: #212121;
    font-size: 0.16rem;
    font-weight: 500;
    line-height: 1.5;
  }

  .more {
    display: flex;
    align-items: center;
    gap: 0.01rem;
    color: #878787;
    font-weight: 400;
    font-size: 0.11rem;
    line-height: 1.4;
    cursor: pointer;
  }
}

.book-wrapper {
  padding: 0 0.12rem;
  background-color: #fff;
  border-radius: 0.08rem;
}
</style>
