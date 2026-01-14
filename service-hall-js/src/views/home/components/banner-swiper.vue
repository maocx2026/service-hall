<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import Swiper, { Autoplay, Pagination } from 'swiper';

import SwiperItem from './swiper-item.vue';

import { createBannerSwiperData } from '../helps/data';

Swiper.use([Autoplay, Pagination]);

export default defineComponent({
  components: {
    SwiperItem,
  },

  setup() {
    onMounted(() => {
      // eslint-disable-next-line no-new
      new Swiper('.swiper-container', {
        loop: true,
        // autoplay: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    });

    return {
      bannerData: createBannerSwiperData(),
    };
  },
});
</script>

<template>
  <div class="swiper-pannel">
    <div class="swiper-container-link swiper-container">
      <div class="swiper-wrapper">
        <SwiperItem
          v-for="(item, idx) in bannerData"
          :key="`link-${idx}`"
          class="swiper-slide"
          :link-list="item"
        />
      </div>
      <div class="swiper-pagination" />
    </div>
  </div>
</template>

<style lang="less">
@import url("../../../../node_modules/swiper/swiper-bundle.min.css");

.swiper-container-link {
  padding-bottom: 0.24rem;

  &.swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: 0.015rem;

    .swiper-pagination-bullet {
      width: 0.03rem;
      height: 0.03rem;
      margin: 0 0.01rem;
      border-radius: 0.015rem;
      transition: all 0.2s linear;

      &.swiper-pagination-bullet-active {
        width: 0.08rem;
      }
    }
  }
}
</style>
