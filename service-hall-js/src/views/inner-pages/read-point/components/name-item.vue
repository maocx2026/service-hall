<script lang="ts">
import { defineComponent, ref } from 'vue';

import { namespaceT } from '@/helps/namespace-t';

import LearnAbountPopup from './learn-about-popup.vue';


export default defineComponent({
  components: {
    LearnAbountPopup,
  },

  props: {
    name: {
      type: String,
      default: '',
    },
  },

  setup() {
    const t = namespaceT('points.read');
    const showPopup = ref(false);

    function onShowPopup() {
      showPopup.value = true;
    }

    return {
      t,
      showPopup,

      onShowPopup,
    };
  },
});
</script>

<template>
  <div class="name-item">
    <div class="name">
      {{ name }}
    </div>
    <div class="tip">
      <div
        class="spirte spirte-help"
        @click="onShowPopup"
      />
      {{ t('learnAboutReadPoint') }}
    </div>
  </div>
  <LearnAbountPopup v-model="showPopup" />
</template>

<style lang="less" scoped>
.name-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.14rem 0.14rem 0.16rem;
  background-color: #fff;
  border-radius: 0.08rem;

  .name {
    position: relative;
    color: #222;
    height: 0.25rem;
    font-weight: 500;
    font-size: 0.18rem;
    line-height: 0.25rem;

    &::after {
      position: relative;
      right: 0;
      bottom: 0.19rem;
      left: 0;
      display: inline-block;
      width: 100%;
      height: 0.07rem;
      background-color: fade(#4d65cb, 15);
      content: "";
    }
  }

  .tip {
    display: flex;
    align-items: center;
    gap: 0.02rem;
    color: #777;
    font-weight: 400;
    font-size: 0.12rem;
    line-height: 0.16rem;
  }
}
</style>
