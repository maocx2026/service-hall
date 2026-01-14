<script lang="ts">
import { defineComponent, toRef, ref } from 'vue';
import { Popup, Button } from 'vant';

import { namespaceT } from '@/helps/namespace-t';
import { openToastError, openToastSuccess } from '@/helps/toast';

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
    'update:modelValue',
    'on-comfirm',
  ],

  setup(props, { emit }) {
    const t = namespaceT('myReadCard.bindAccount');
    const show = toRef(props, 'modelValue');
    const saving = ref(false);

    function onClickClose() {
      emit('update:modelValue', false);
    }

    function onClickUnbind() {
      try {
        saving.value = true;
        // TODO:解绑微信的逻辑
        openToastSuccess(t('unBindSucc'));
        onClickClose();
        emit('on-comfirm');
      } catch (error) {
        openToastError(error.message);
        throw error;
      } finally {
        saving.value = false;
      }
    }

    return {
      t,
      show,
      saving,

      onClickClose,
      onClickUnbind,
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
      {{ t('tip') }}
    </div>
    <div class="content">
      <div class="cont">
        {{ t('wechartTip') }}
      </div>

      <div class="actions">
        <VButton
          block
          type="default"
          class="vant-default-btn"
          @click="onClickClose"
        >
          {{ $t('common.action.cancel') }}
        </VButton>
        <VButton
          block
          type="primary"
          class="vant-primary-btn"
          :loading="saving"
          @click="onClickUnbind"
        >
          {{ t('confirmUnbind') }}
        </VButton>
      </div>
    </div>
  </VPopup>
</template>

<style lang="less" scoped>
.sh-vant-popup-center .content .cont {
  font-size: 0.15rem;
  text-align: center;
}
</style>
