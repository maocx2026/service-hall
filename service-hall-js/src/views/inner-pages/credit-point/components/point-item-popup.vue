<script lang="ts">
import { defineComponent, toRef } from 'vue';
import { Popup, Button } from 'vant';

import { namespaceT } from '@/helps/namespace-t';
import PimaSanitizeHtml from '@/components/common/pima-sanitize-html';

export default defineComponent({
  components: {
    VPopup: Popup,
    VButton: Button,
    PimaSanitizeHtml,
  },

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
  },

  emits: [
    'update:modelValue',
  ],

  setup(props, { emit }) {
    const t = namespaceT('points.read');
    const show = toRef(props, 'modelValue');

    function onClickClose() {
      emit('update:modelValue', false);
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
  >
    <div class="header">
      {{ title }}
    </div>
    <div class="content">
      <div class="cont">
        <PimaSanitizeHtml
          :inner-html="content"
          class="view"
        />
      </div>

      <div class="actions">
        <VButton
          block
          type="primary"
          class="vant-primary-btn"
          @click="onClickClose"
        >
          {{ $t('common.action.close') }}
        </VButton>
      </div>
    </div>
  </VPopup>
</template>

<style lang="less" scoped>
.cont {
  .view {
    text-indent: 0.3rem;
    white-space: pre-line;
  }
}
</style>
