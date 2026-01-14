<script lang="ts">
import { defineComponent, toRef, ref } from 'vue';
import { Popup, Button, Rate } from 'vant';

import { namespaceT } from '@/helps/namespace-t';
import { openToastError, openToastSuccess } from '@/helps/toast';

export default defineComponent({
  components: {
    VPopup: Popup,
    VButton: Button,
    VRate: Rate,
  },

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },

    payload: {
      type: Object,
      default: () => {},
    },
  },

  emits: [
    'on-close',
  ],

  setup(props, { emit }) {
    const t = namespaceT('borrowHistory.score');
    const show = toRef(props, 'modelValue');
    const model = ref(5);
    const saving = ref(false);

    function onClickClose() {
      emit('on-close');
    }

    function onClickSubmit() {
      try {
        saving.value = true;
        // TODO:评分逻辑
        console.log(props.payload, model.value);
        openToastSuccess(t('hint.saveSucc'));
        onClickClose();
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
      model,
      saving,

      onClickClose,
      onClickSubmit,
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
    @click-close-icon="onClickClose"
  >
    <div class="header">
      {{ t('title') }}
    </div>
    <div class="content">
      <div class="cont">
        <VRate
          v-model="model"
          :size="25"
          color="#ffd21e"
          void-icon="star"
          void-color="#eee"
        />

        <div class="mt-12">
          {{ model }}
        </div>
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
          :loading="saving"
          @click="onClickSubmit"
        >
          {{ $t('common.action.submit') }}
        </VButton>
      </div>
    </div>
  </VPopup>
</template>

<style lang="less" scoped>
.cont {
  text-align: center;
}
</style>
