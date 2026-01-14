<script lang="ts">
import { defineComponent, computed, getCurrentInstance } from 'vue';

import { push } from '@/helps/navigation';
import { RouterName as RN } from '@/config/router';

export default defineComponent({
  props: {
    content: {
      type: Object,
      default: () => {},
    },

    idx: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    const vm = getCurrentInstance();

    const formatIdx = computed(() => {
      return String(props.idx + 1).padStart(2, '0');
    });

    function onClickDetail() {
      push(vm.proxy.$router, {
        name: RN.ShaoerBookDetail,
        params: {
          id: props.content.metaid,
        },
      });
    }

    return {
      formatIdx,

      onClickDetail,
    };
  },
});
</script>

<template>
  <div
    class="book-item-wrap"
    @click="onClickDetail"
  >
    <div class="cover">
      <img
        :src="content.cover"
        alt=""
      >
    </div>

    <div class="meta">
      <div class="cate">
        {{ content.cate }}
      </div>

      <div class="title">
        {{ formatIdx }} {{ content.title }}
      </div>

      <div class="info-other">
        {{ `${content.author} / ${content.publishYear} / ${content.publisher}` }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.book-item-wrap {
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.08rem;
  padding: 0.12rem;
  border-radius: 0.08rem;
  background-color: #fff;

  .cover {
    width: 0.65rem;

    img {
      width: 100%;
      object-fit: cover;
    }
  }
}

.meta {
  flex: 1;
  margin-left: 0.14rem;

  .cate {
    margin-bottom: 0.04rem;
    color: #777;
    font-size: 0.1rem;
    line-height: 1.4;
  }

  .title {
    margin-bottom: 0.07rem;
    color: #222;
    font-weight: 700;
    font-size: 0.16rem;
    line-height: 1.4;
  }

  .info-other {
    color: #777;
    font-size: 0.12rem;
    line-height: 1.4;
  }
}
</style>
