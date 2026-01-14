<script lang="ts">
import { defineComponent, toRef } from 'vue';
import { Rate } from 'vant';

export default defineComponent({
  components: {
    VRate: Rate,
  },

  props: {
    model: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    const rate = toRef(props, 'model');

    return {
      rate,
    };
  },
});
</script>

<template>
  <div class="rate-wrap">
    <VRate
      v-model="rate"
      readonly
      :size="13"
      :gutter="2"
      :color="'#ffcb12'"
    >
      <template #icon>
        <div class="spirte spirte-star" />
      </template>

      <template #void-icon>
        <div class="spirte spirte-star1" />
      </template>
    </VRate>
    <span
      v-if="model > 0"
      class="rate"
    >
      {{ $t('szlibBookList.detail.rate', { rate: model }) }}
    </span>
    <span
      v-else
      class="rate"
    >
      {{ $t('szlibBookList.detail.notRate') }}
    </span>
  </div>
</template>

<style lang="less" scoped>
.rate-wrap {
  display: flex;
  align-items: center;

  .rate {
    margin-left: 0.03rem;
    color: #fff;
    font-weight: 400;
    font-size: 0.13rem;
  }
}
</style>
