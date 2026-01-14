<script lang="ts">
import { defineComponent } from 'vue';

import { namespaceT } from '@/helps/namespace-t';

import TopSearchWrapper from './components/top-search-wrapper.vue';
import BannerWrapper from './components/banner-wrapper.vue';
import BlockLinkWrapper from './components/block-link-wrapper.vue';
import BookRecommend from './components/book-recommend.vue';

import { createDataSourceData, createUpdateNewData } from './helps/data';


export default defineComponent({
  components: {
    TopSearchWrapper,
    BannerWrapper,
    BlockLinkWrapper,
    BookRecommend,
  },

  setup() {
    return {
      t: namespaceT('home'),
      dataSourceData: createDataSourceData(),
      updateNewData: createUpdateNewData(),
    };
  },
});
</script>

<template>
  <div>
    <TopSearchWrapper />
    <BannerWrapper />
    <!-- 资源 -->
    <BlockLinkWrapper
      :title="t('dataSource.title')"
      :data="dataSourceData"
    />
    <!-- 上新 -->
    <BlockLinkWrapper
      :title="t('updateNew.title')"
      :data="updateNewData"
    />
    <BookRecommend />
  </div>
</template>
