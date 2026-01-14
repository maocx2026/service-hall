<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
});
</script>

<template>
  <div class="block-data-item">
    <div class="title">
      {{ data.title }}
    </div>
    <div class="data">
      {{ data.num }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.block-data-item {
  width: 100%;
  min-height: 0.8rem;
  padding: 0.12rem 0.16rem 0.14rem;
  color: #222;
  font-weight: 500;
  font-size: 0.24rem;
  line-height: 0.2rem;
  background-color: #fff;
  border-radius: 0.08rem;

  .title {
    display: inline-block;
    margin-bottom: 0.05rem;
    color: #777;
    font-weight: 400;
    font-size: 0.14rem;
    line-height: 1.5;
  }
}
</style>
