<script lang="ts">
import { defineComponent } from 'vue';

import BannerSwiper from './banner-swiper.vue';
import NoticeBlock from './notice-block.vue';

export default defineComponent({
  components: {
    BannerSwiper,
    NoticeBlock,
  },

  setup() {
    return {};
  },
});
</script>


<template>
  <div class="banner-wrapper">
    <div class="banner-inner">
      <BannerSwiper />

      <NoticeBlock />
    </div>
  </div>
</template>

<style lang="less" scoped>
.banner-wrapper {
  margin-top: 0.38rem;
  padding: 0 0.12rem;
}

.banner-inner {
  padding: 0 0.16rem;
  border-radius: 0.08rem;
  background-color: #fff;
}
</style>
