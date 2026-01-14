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

    errorMsg: {
      type: String,
      default: '',
    },
  },

  emits: [
    'on-view-order',
  ],

  setup(props, { emit }) {
    const t = namespaceT('bookAdvanceBorrow.add');
    const show = toRef(props, 'modelValue');

    function onViewOrder() {
      emit('on-view-order');
    }

    return {
      t,
      show,

      onViewOrder,
    };
  },
});
</script>

<template>
  <VPopup
    v-model:show="show"
    class="sh-popup-result-page"
    :close-on-click-overlay="false"
  >
    <div class="page-wrap">
      <div class="result-wrap">
        <div class="spirte spirte-result-error" />
        <div class="title">
          {{ t('hint.addFailed') }}
        </div>
        <div class="sub-title">
          {{ errorMsg }}
        </div>
      </div>
      <div class="action-block">
        <VButton
          block
          type="primary"
          class="vant-primary-btn"
          @click="onViewOrder"
        >
          {{ t('btn.viewOrder') }}
        </VButton>
      </div>
    </div>
  </VPopup>
</template>
