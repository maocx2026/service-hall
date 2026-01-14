<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    dataSource: {
      type: Object,
      default: () => {},
    },
  },

  setup() {
    return {};
  },
});
</script>

<template>
  <div class="content-wrap">
    <div class="title">
      {{ $t('newBookCart.serviceDesc') }}
    </div>
    <div class="desc">
      {{ dataSource.desc }}
    </div>
    <div class="line" />

    <div
      v-for="item in dataSource.steps"
      :key="item.key"
    >
      <div class="title">
        {{ item.title }}
      </div>
      <div class="desc">
        {{ item.desc }}
      </div>
      <div class="img">
        <img
          :src="item.img"
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.content-wrap {
  padding: 0.2rem 0.2rem 0.4rem;
  background-color: #fff;

  .title {
    margin-bottom: 0.06rem;
    color: #222;
    font-weight: 600;
    font-size: 0.16rem;
  }

  .desc {
    color: #777;
    font-weight: 400;
    font-size: 0.12rem;
  }

  .img {
    margin-top: 0.3rem;
    margin-bottom: 0.6rem;
    text-align: center;
  }

  .line {
    width: 100%;
    height: 0.01rem;
    margin: 0.16rem 0 0.2rem;
    background-color: fade(#000, 10);
  }
}
</style>
