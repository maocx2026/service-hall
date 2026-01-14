<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';

import { namespaceT } from '@/helps/namespace-t';
import { push } from '@/helps/navigation';
import { RouterName as RN } from '@/config/router';

export default defineComponent({
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {
    const vm = getCurrentInstance();
    const t = namespaceT('discover.bookList');

    function onClickDetail() {
      push(vm.proxy.$router, {
        name: RN.SzlibBookListDetail,
        params: {
          id: props.content.recordno,
        },
      });
    }

    return {
      t,

      onClickDetail,
    };
  },
});
</script>


<template>
  <div
    class="list-item"
    @click="onClickDetail"
  >
    <div class="cover">
      <img
        :src="content.cover"
        alt=""
      >
    </div>

    <div class="meta">
      <div class="title">
        {{ content.title }}
      </div>
      <div class="item">
        {{ content.author }}
      </div>
      <div class="item">
        {{ content.publisher }}
      </div>
      <div class="item">
        {{ t('label.shelf') }}
        {{ content.shelf }}
      </div>
      <div class="item">
        {{ t('label.shelfTime') }}
        {{ content.shelfTime }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.list-item {
  display: flex;
  padding: 0.12rem;

  .cover {
    width: 0.72rem;
    margin-right: 0.14rem;

    img {
      width: 100%;
      object-fit: cover;
    }
  }

  .meta {
    flex: 1;
    line-height: 1.45;

    .title {
      margin-bottom: 0.05rem;
      color: #222;
      font-weight: 700;
      font-size: 0.16rem;
    }

    .item {
      margin-bottom: 0.04rem;
      color: #777;
      font-weight: 400;
      font-size: 0.12rem;
    }
  }
}
</style>
