<script lang="ts">
import { defineComponent } from 'vue';
import { Button } from 'vant';

import { namespaceT } from '@/helps/namespace-t';

export default defineComponent({
  components: {
    VButton: Button,
  },

  props: {
    content: {
      type: Object,
      default: () => {},
    },
    deling: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'on-del',
  ],

  setup(props, { emit }) {
    const t = namespaceT('expressBookCart');

    function onClickDel() {
      emit('on-del');
    }

    return {
      t,

      onClickDel,
    };
  },
});
</script>

<template>
  <div class="book-item">
    <div class="cover">
      <img
        :src="content.cover"
        alt=""
      >
      <div
        v-if="content.isNew"
        class="new-label spirte spirte-new-book-label"
      />
    </div>

    <div class="meta">
      <div>
        <div class="title">
          {{ content.title }}
        </div>
        <div class="item">
          {{ t('label.author') }}
          {{ content.author }}
        </div>
        <div class="item">
          {{ t('label.publisher') }}
          {{ content.publisher }}
        </div>
      </div>
      <div class="actions">
        <VButton
          round
          class="del-btn"
          :loading="deling"
          @click="onClickDel"
        >
          {{ $t('common.action.delete') }}
        </VButton>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.book-item {
  display: flex;
  margin-top: 0.08rem;
  padding: 0.12rem;
  background-color: #fff;
  border-radius: 0.08rem;

  .cover {
    position: relative;
    width: 0.72rem;
    margin-right: 0.14rem;

    .new-label {
      position: absolute;
      top: 0.06rem;
      left: -0.04rem;
    }
  }
}

.meta {
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  .title {
    margin-bottom: 0.06rem;
    color: #222;
    font-weight: 700;
    font-size: 0.16rem;
    line-height: 1.4;
  }

  .item {
    margin-top: 0.02rem;
    color: #777;
    font-weight: 400;
    font-size: 0.12rem;
    line-height: 1.4;
  }

  .actions {
    display: flex;
    justify-content: flex-end;

    .del-btn {
      height: 0.25rem;
      padding: 0.04rem 0.14rem;
      color: var(--red-color);
      border-color: var(--red-color);
      font-weight: 400;
      font-size: 0.12rem;
    }
  }
}
</style>
