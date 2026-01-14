<script lang="ts">
import { defineComponent } from 'vue';

import { namespaceT } from '@/helps/namespace-t';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: '',
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    const t = namespaceT('myReadCard.messageOrder');

    return {
      t,
    };
  },
});
</script>

<template>
  <div class="message-order-item">
    <div class="left">
      <div class="spirte spirte-wechart" />
      <div class="content">
        <div class="title">
          {{ title }}
        </div>
        <div class="desc">
          {{ desc }}
        </div>
      </div>
    </div>
    <div class="right">
      <slot>
        {{ isOpen ? t('open') : t('notOpen') }}
      </slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.message-order-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.08rem;
  padding: 0.14rem;
  background-color: #fff;
  border-radius: 0.08rem;

  .left {
    flex: 1;
    display: flex;
    align-content: flex-start;

    .spirte-wechart {
      position: relative;
      top: 0.05rem;
    }
  }

  .content {
    flex: 1;
    margin-right: 0.2rem;
    margin-left: 0.12rem;
    line-height: 1.45;

    .title {
      margin-bottom: 0.02rem;
      color: #222;
      font-weight: 400;
      font-size: 0.14rem;;
    }

    .desc {
      color: #777;
      font-weight: 300;
      font-size: 0.11rem;;
    }
  }

  .right {
    color: #bababa;
    font-weight: 400;
    font-size: 0.14rem;
  }
}
</style>
