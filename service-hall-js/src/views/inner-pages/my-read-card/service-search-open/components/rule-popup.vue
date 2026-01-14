<script lang="ts">
import { defineComponent, toRef } from 'vue';
import { Popup, Button } from 'vant';

import { namespaceT } from '@/helps/namespace-t';

export default defineComponent({
  components: {
    VPopup: Popup,
    VButton: Button,
  },

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'on-close',
    'on-agree',
  ],

  setup(props, { emit }) {
    const t = namespaceT('myReadCard.serviceSearchOpen.rulePopup');
    const show = toRef(props, 'modelValue');

    function onClickClose() {
      emit('on-close');
    }

    function onClickAgree() {
      emit('on-agree');
    }

    return {
      t,
      show,

      onClickClose,
      onClickAgree,
    };
  },
});
</script>

<template>
  <VPopup
    v-model:show="show"
    round
    class="sh-vant-popup-center"
    :close-on-click-overlay="false"
  >
    <div class="header">
      {{ t('title') }}
    </div>
    <div class="content">
      <div class="cont">
        <div class="cont-item">
          {{ t('content[0]') }}
        </div>
        <div class="cont-item">
          {{ t('content[1]') }}
        </div>
        <div class="cont-item">
          {{ t('content[2]') }}
        </div>
        <div class="cont-item">
          {{ t('content[3]') }}
        </div>
        <div class="cont-item">
          {{ t('content[4]') }}
        </div>
        <ul>
          <li>{{ t('content[5]') }}</li>
          <li>{{ t('content[6]') }}</li>
          <li>{{ t('content[7]') }}</li>
          <li>{{ t('content[8]') }}</li>
          <li>{{ t('content[9]') }}</li>
          <li>{{ t('content[10]') }}</li>
          <li>{{ t('content[11]') }}</li>
          <li>{{ t('content[12]') }}</li>
          <li>{{ t('content[13]') }}</li>
        </ul>
        <div class="cont-item">
          {{ t('content[14]') }}
        </div>
        <ul>
          <li>{{ t('content[15]') }}</li>
          <li>{{ t('content[26]') }}</li>
          <li>{{ t('content[17]') }}</li>
          <li>{{ t('content[18]') }}</li>
          <li>{{ t('content[19]') }}</li>
          <li>{{ t('content[20]') }}</li>
          <li>{{ t('content[21]') }}</li>
          <li>{{ t('content[22]') }}</li>
          <li>{{ t('content[23]') }}</li>
        </ul>
        <div class="cont-item">
          {{ t('content[24]') }}
        </div>
        <div class="cont-item">
          {{ t('content[25]') }}
        </div>
        <div class="cont-item">
          {{ t('content[26]') }}
        </div>
        <div class="cont-item">
          {{ t('content[27]') }}
        </div>
        <div class="cont-item">
          {{ t('content[28]') }}
        </div>
        <div class="cont-item">
          {{ t('content[29]') }}
        </div>
        <div class="cont-item">
          {{ t('content[30]') }}
        </div>
        <div class="cont-item bold">
          {{ t('content[31]') }}
        </div>
      </div>

      <div class="actions">
        <VButton
          block
          type="default"
          class="vant-default-btn"
          @click="onClickClose"
        >
          {{ t('close') }}
        </VButton>

        <VButton
          block
          type="primary"
          class="vant-primary-btn"
          @click="onClickAgree"
        >
          {{ t('btnText') }}
        </VButton>
      </div>
    </div>
  </VPopup>
</template>
