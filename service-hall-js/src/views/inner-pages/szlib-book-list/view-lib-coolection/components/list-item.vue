<script lang="ts">
import { defineComponent } from 'vue';

import { namespaceT } from '@/helps/namespace-t';

import { getCollectionStatusText, getCollectionStatusTheme } from '../helps/data';


export default defineComponent({
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },

  setup() {
    const t = namespaceT('szlibBookList.collection.label');

    return {
      t,

      getCollectionStatusText,
      getCollectionStatusTheme,
    };
  },
});
</script>

<template>
  <div class="list-item">
    <div class="title-box">
      <div class="title">
        <div class="spirte spirte-location" />
        {{ content.libraryName }}
      </div>
      <div
        class="status"
        :class="getCollectionStatusTheme(content.status)"
      >
        {{ getCollectionStatusText(content.status) }}
      </div>
    </div>
    <div class="item">
      {{ t('address') }}
      {{ content.address }}
    </div>
    <div class="item">
      {{ t('cate') }}
      {{ content.cate }}
    </div>
    <div class="item">
      {{ t('callno') }}
      {{ content.callno }}
    </div>
    <div class="item">
      {{ t('barcode') }}
      {{ content.barcode }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.list-item {
  padding: 0.14rem;
  line-height: 1.45;

  .title-box {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 0.06rem;
      margin-bottom: 0.06rem;
      color: #444;
      font-weight: 600;
      font-size: 0.15rem;
    }

    .status {
      height: 0.2rem;
      padding-left: 0.05rem;
      padding-right: 0.07rem;
      font-weight: 400;
      font-size: 0.11rem;
      border-radius: 0.1rem;
      line-height: 0.2rem;

      &.red {
        color: var(--red-color);
        background-color: #fef8f8;
      }

      &.green {
        color: var(--green-color);
        background-color: #f7fbf7;
      }
    }
  }

  .item {
    margin-top: 0.04rem;
    color: #777;
    font-weight: 400;
    font-size: 0.12rem;
  }
}
</style>
