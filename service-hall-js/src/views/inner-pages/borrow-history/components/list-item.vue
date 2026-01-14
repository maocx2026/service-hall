<script lang="ts">
import { defineComponent, ref } from 'vue';
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
  },

  emits: [
    'on-score',
  ],

  setup(props, { emit }) {
    const t = namespaceT('borrowHistory');
    const isExpend = ref(false);

    function onClickScore() {
      emit('on-score');
    }

    function onToggleExpend() {
      isExpend.value = !isExpend.value;
    }

    return {
      t,
      isExpend,

      onClickScore,
      onToggleExpend,
    };
  },
});
</script>


<template>
  <div class="list-item">
    <div class="meta">
      <div class="title">
        {{ content.title }}
      </div>
      <div class="item">
        {{ content.author }}
      </div>
      <div class="item">
        {{ t('label.operateType') }}
        {{ content.operateType }}
      </div>
      <div class="item">
        {{ t('label.serviceAddr') }}
        {{ content.serviceAddr }}
      </div>
      <div
        class="item"
        :class="{'shrink': !isExpend}"
      >
        {{ t('label.circulationCate') }}
        {{ content.circulationCate }}
      </div>
      <div
        class="item"
        :class="{'shrink': !isExpend}"
      >
        {{ t('label.fetchNo') }}
        {{ content.fetchNo }}
      </div>
      <div
        class="item"
        :class="{'shrink': !isExpend}"
      >
        {{ t('label.barcode') }}
        {{ content.barcode }}
      </div>
      <div class="operate-time">
        {{ content.operateTime }}
      </div>
      <VButton
        v-if="content.canScore"
        type="default"
        class="vant-primary-btn default-btn"
        @click="onClickScore"
      >
        {{ t('action.score') }}
      </VButton>
    </div>

    <div
      class="expend-shrink-btn"
      :class="{'expend': isExpend}"
      @click="onToggleExpend"
    >
      {{ isExpend ? t('action.shrink') : t('action.expend') }}
      <div class="spirte spirte-bottom-triangle-gray1" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.meta {
  position: relative;
  padding: 0.14rem 0.14rem 0.12rem;

  .title {
    margin-bottom: 0.04rem;
    color: #444;
    font-weight: 600;
    font-size: 0.15rem;
  }

  .item {
    margin-bottom: 0.04rem;
    overflow: hidden;
    color: #777;
    font-weight: 400;
    font-size: 0.12rem;
    transition: all 0.2s linear;

    &.shrink {
      height: 0;
      margin-bottom: 0;
    }
  }

  .operate-time {
    color: #999;
    font-weight: 400;
    font-size: 0.12rem;
  }

  .default-btn {
    position: absolute;
    right: 0.14rem;
    bottom: 0.14rem;
  }
}
</style>
