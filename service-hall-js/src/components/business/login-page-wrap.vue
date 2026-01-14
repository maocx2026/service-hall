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
  <div class="login-page-wrap">
    <div class="header">
      <img
        src="@/assets/img/logo-white.png"
        alt=""
        class="logo"
      >
    </div>
    <div class="content-wrap">
      <div
        v-if="title"
        class="title"
      >
        {{ title }}
      </div>

      <slot />
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-page-wrap {
  .header {
    height: 1.43rem;
    padding-top: 0.24rem;
    background: linear-gradient(311deg, #4060d0 -3.29%, #4d6ef6 51.72%, #4162d3 104.58%);
    text-align: center;

    .logo {
      width: 1.74rem;
    }
  }

  .content-wrap {
    min-height: calc(100vh - 1.02rem);
    margin-top: -0.41rem;
    padding: 0.2rem 0.16rem;
    border-radius: 0.24rem 0.24rem 0 0;
    background-color: #fff;

    .title {
      margin-bottom: 0.12rem;
      margin-left: 0.04rem;
      color: #222;
      font-weight: 600;
      font-size: 0.2rem;
      line-height: 1.45;
    }
  }
}
</style>
