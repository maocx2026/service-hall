<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';

import { push } from '@/helps/navigation';
import { RouterName as RN } from '@/config/router';

export default defineComponent({
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },

  emits: [
    'on-more-action',
  ],

  setup(props, { emit }) {
    const vm = getCurrentInstance();

    function onClickActions() {
      emit('on-more-action');
    }

    function onClickDetail() {
      push(vm.proxy.$router, {
        name: RN.SzlibBookListDetail,
        params: {
          id: props.content.recordno,
        },
      });
    }

    return {
      onClickActions,
      onClickDetail,
    };
  },
});
</script>


<template>
  <div
    class="collection-item"
    @click="onClickDetail"
  >
    <div class="cover-box">
      <img
        :src="content.cover"
        alt=""
      >
    </div>
    <div class="meta">
      <div>
        <div class="title">
          {{ content.title }}
        </div>
        <div class="date">
          {{ $t('myCollection.label.collectDate') }}
          {{ content.createTime }}
        </div>
      </div>

      <div class="action">
        <div
          class="spirte spirte-more-action"
          @click.stop.prevent="onClickActions"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.collection-item {
  display: flex;
  gap: 0.14rem;
  margin-bottom: 0.08rem;
  padding: 0.12rem 0.1rem 0.12rem 0.12rem;
  border-radius: 0.08rem;
  background-color: #fff;
}

.cover-box {
  width: 0.72rem;

  img {
    width: 100%;
    object-fit: cover;
  }
}

.meta {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 0.04rem;

  .title {
    color: #222;
    font-weight: 700;
    font-size: 0.16rem;
    line-height: 1.4;
  }

  .date {
    margin-top: 0.06rem;
    color: #777;
    font-weight: 300;
    font-size: 0.12rem;
    line-height: 1.4;
  }

  .action {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
  }
}
</style>
