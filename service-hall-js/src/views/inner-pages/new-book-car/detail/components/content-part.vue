<script lang="ts">
import { defineComponent, ref } from 'vue';

import { namespaceT } from '@/helps/namespace-t';

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {
    const t = namespaceT('szlibBookList.detail');
    const model = ref(props.modelValue);

    return {
      t,
      model,
    };
  },
});
</script>


<template>
  <div class="content-wrap">
    <div
      v-if="model.recommendReason"
      class="block-item"
    >
      <div class="sub-title">
        {{ t('title.recommendReason') }}
      </div>
      <div class="content">
        {{ model.recommendReason }}
      </div>
    </div>

    <div
      v-if="model.additionSummary"
      class="block-item"
    >
      <div class="sub-title">
        {{ t('title.additionSummary') }}
      </div>
      <div class="content">
        {{ model.additionSummary }}
      </div>
    </div>

    <div
      v-if="model.contentSummary"
      class="block-item"
    >
      <div class="sub-title">
        {{ t('title.contentSummary') }}
      </div>
      <div class="content">
        {{ model.contentSummary }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.content-wrap {
  min-height: calc(100vh - 1.89rem);
  padding: 0.2rem;
  margin-top: -0.24rem;
  border-radius: 0.24rem 0.24rem 0 0;
  background-color: #fff;

  .sub-title {
    margin-bottom: 0.04rem;
    color: #222;
    font-weight: 500;
    font-size: 0.14rem;
    line-height: 1.45;
  }

  .block-item {
    padding-bottom: 0.16rem;
    padding-top: 0.16rem;

    .content {
      color: #777;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 1.57;
    }

    &:not(:first-child) {
      border-top: 0.005rem solid fade(#000, 7);
    }
  }
}
</style>
