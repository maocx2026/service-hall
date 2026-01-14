<script lang="ts">
import { defineComponent } from 'vue';

import { namespaceT } from '@/helps/namespace-t';

import { getStatusTxt, getStatusTheme } from '../helps/data';

export default defineComponent({
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },

  setup() {
    const t = namespaceT('recommendPurchase.list');

    return {
      t,

      getStatusTxt,
      getStatusTheme,
    };
  },
});
</script>


<template>
  <div class="list-item">
    <div class="list-meta">
      <div class="title-box">
        <div class="title">
          {{ t('label.title') }}
          {{ content.title }}
        </div>
        <div
          class="status"
          :class="getStatusTheme(content.status)"
        >
          {{ getStatusTxt(content.status) }}
        </div>
      </div>

      <div class="item">
        {{ content.author }} / {{ content.publisher }}
      </div>

      <div class="item">
        {{ t('label.people') }}
        {{ content.people }}
      </div>
    </div>
    <div
      v-if="content.replayMsg"
      class="replay-info"
    >
      <div class="title">
        {{ t('label.replayMsg') }}
      </div>

      <div class="cont">
        {{ content.replayMsg }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.list-item {
  margin-bottom: 0.08rem;
  background-color: #fff;
  border-radius: 0.08rem;
  line-height: 1.4;
}

.list-meta {
  padding: 0.14rem 0.14rem 0.1rem;

  .title-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.08rem;

    .title {
      flex: 1;
      margin-bottom: 0.04rem;
      color: #444;
      font-weight: 600;
      font-size: 0.15rem;
    }
  }

  .item {
    margin-bottom: 0.04rem;
    color: #777;
    font-weight: 400;
    font-size: 0.12rem;
  }

  .status {
    height: 0.2rem;
    padding: 0 0.07rem;
    font-weight: 400;
    font-size: 0.11rem;
    line-height: 0.2rem;
    border-radius: 0.1rem;

    &.red {
      color: var(--red-color);
      background-color: #fef8f8;
    }

    &.green {
      color: var(--green-color);
      background-color: #f7fbf7;
    }

    &.blue {
      color: var(--primary-color);
      background-color: #f7f8ff;
    }
  }
}

.replay-info {
  padding: 0.1rem 0.14rem 0.14rem;
  color: #444;
  font-weight: 400;
  font-size: 0.12rem;
  border-top: 0.005rem solid fade(#000, 7);

  .title {
    margin-bottom: 0.04rem;
    color: #bababa;
  }
}
</style>
