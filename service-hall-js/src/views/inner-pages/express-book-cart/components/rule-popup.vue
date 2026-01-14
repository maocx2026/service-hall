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
    const t = namespaceT('expressBookCart.rule');
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
    class="sh-vant-popup-center"
    :close-on-click-overlay="false"
  >
    <div class="header">
      {{ t('title') }}
    </div>
    <div class="content">
      <div class="cont">
        {{ t('content[0]') }} <br>
        {{ t('content[1]') }} <br>
        {{ t('content[2]') }} <br>
        {{ t('content[3]') }} <br>
        {{ t('content[4]') }} <br>
        {{ t('content[5]') }} <br>
        {{ t('content[6]') }} <br>
        {{ t('content[7]') }} <br>
        {{ t('content[8]') }}
      </div>

      <div class="actions">
        <VButton
          block
          type="default"
          class="vant-default-btn"
          @click="onClickClose"
        >
          {{ $t('common.action.close') }}
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
