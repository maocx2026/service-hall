<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    hasMenu: {
      type: Boolean,
      default: false,
    },
  },
});
</script>


<template>
  <div class="pima-layout">
    <div
      class="body"
      :class="{'has-menu': hasMenu}"
    >
      <div class="main">
        <slot name="main" />
      </div>
    </div>
    <div
      class="footer"
      :class="{'has-menu': hasMenu}"
    >
      <slot name="footer" />
    </div>
  </div>
</template>


<style lang="less" scoped>
.pima-layout {
  background-color: #f7f8ff;

  > .body {
    height: 100vh;
    overflow: auto;

    &.has-menu {
      height: calc(100vh - 0.94rem);
    }

    .main {
      height: 100%;
    }
  }

  > .footer {
    display: none;
    height: 0.94rem;

    &.has-menu {
      position: relative;
      z-index: 4;
      display: block;
    }
  }
}
</style>
