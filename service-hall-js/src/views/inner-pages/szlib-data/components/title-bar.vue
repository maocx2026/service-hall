<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
  },
});
</script>

<template>
  <div class="title-wrap">
    <div class="title">
      {{ title }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.title-wrap {
  position: relative;
  display: flex;
  align-items: center;
  margin: 0.24rem 0 0.14rem;
  padding-left: 0.16rem;
  font-size: 0.16rem;

  &::before {
    position: absolute;
    top: 50%;
    left: 0.04rem;
    width: 0.04rem;
    height: 0.12rem;
    background: linear-gradient(311deg, #4060d0 -3.29%, #4d6ef6 51.72%, #4162d3 104.58%);
    border-radius: 0.03rem;
    transform: translateY(-50%);
    content: "";
  }

  .title {
    color: #222;
    font-weight: 500;
  }
}
</style>
