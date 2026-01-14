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
  ],

  setup(props, { emit }) {
    const t = namespaceT('myFinance.pointDeductionModal');
    const show = toRef(props, 'modelValue');

    function onClickClose() {
      emit('on-close');
    }

    return {
      t,
      show,

      onClickClose,
    };
  },
});
</script>

<template>
  <VPopup
    v-model:show="show"
    class="sh-vant-popup-center"
    :close-on-click-overlay="false"
    @click-close-icon="onClickClose"
  >
    <div class="header">
      {{ t('title') }}
    </div>
    <div class="content">
      <div class="cont">
        {{ t('content[0]') }} <br>
        {{ t('content[1]') }} <br>
        {{ t('content[2]') }}
      </div>

      <div class="actions">
        <VButton
          block
          type="primary"
          class="vant-primary-btn"
          @click="onClickClose"
        >
          {{ t('close') }}
        </VButton>
      </div>
    </div>
  </VPopup>
</template>
