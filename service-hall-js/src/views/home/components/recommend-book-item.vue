<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    content: {
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
  <div class="recommend-book-item">
    <div class="cover-box">
      <img
        :src="content.cover"
        alt=""
      >
    </div>

    <div class="meta">
      <div class="title">
        {{ content.title }}
      </div>
      <div class="desc">
        {{ content.desc }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.recommend-book-item {
  display: flex;
  align-items: center;
  gap: 0.1rem;
  padding: 0.12rem 0;

  .cover-box {
    width: 0.6rem;
    height: 0.6rem;
    overflow: hidden;
    border-radius: 0.04rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .meta {
    .title {
      margin-bottom: 0.06rem;
      color: #333;
      font-size: 0.14rem;
      font-weight: 500;
      line-height: 1.5;
    }

    .desc {
      color: #999;
      font-size: 0.13rem;
      font-weight: 400;
      line-height: 1.5;
    }
  }

  &:not(:last-child) {
    border-bottom: 0.5px solid #eaeaea;
  }
}
</style>
