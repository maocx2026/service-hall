<script lang="ts">
import { defineComponent, toRef, ref } from 'vue';
import { Popup, Form, Field, Button } from 'vant';

import { namespaceT } from '@/helps/namespace-t';
import { openToastError, openToastSuccess } from '@/helps/toast';

export default defineComponent({
  components: {
    VPopup: Popup,
    VForm: Form,
    VField: Field,
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
    'on-confirm',
  ],

  setup(props, { emit }) {
    const t = namespaceT('myReadCard.bindAccount');
    const show = toRef(props, 'modelValue');
    const saving = ref(false);
    const volunteerId = ref('');

    function onClose() {
      emit('update:modelValue', false);
    }

    function onSubmit() {
      try {
        saving.value = true;
        // TODO:绑定义工号的逻辑
        console.log('volunteerId', volunteerId.value);
        openToastSuccess(t('bindSucc'));
        onClose();
        emit('on-confirm', volunteerId.value);
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
      volunteerId,
      saving,

      onSubmit,
      onClose,
    };
  },
});
</script>

<template>
  <VPopup
    v-model:show="show"
    position="bottom"
    closeable
    class="form-popup"
    :close-on-click-overlay="false"
    @click-close-icon="onClose"
  >
    <div class="header">
      {{ t('bindVolunteerId') }}
    </div>
    <VForm @submit="onSubmit">
      <VField
        v-model="volunteerId"
        name="volunteerId"
        :placeholder="t('volunteerIdPlace')"
        :rules="[{ required: true, message: t('volunteerIdPlace') }]"
        class="gray-bg-field"
      />
      <div class="action-block">
        <VButton
          block
          type="primary"
          class="vant-primary-btn"
          native-type="submit"
          :loading="saving"
        >
          {{ t('bind') }}
        </VButton>
      </div>
    </VForm>
  </VPopup>
</template>

<style lang="less" scoped>
.form-popup {
  min-height: 2.23rem;
  padding: 0.2rem;
  border-radius: 0.16rem 0.16rem 0 0;

  .header {
    margin-bottom: 0.2rem;
    color: #212121;
    font-weight: 500;
    font-size: 0.16rem;
  }
}

.gray-bg-field {
  padding: 0;

  :deep(.van-field__control) {
    height: 0.53rem;
    padding: 0.16rem 0.12rem;
    font-size: 0.15rem;
    font-weight: 400;
    border-radius: 0.08rem;
    background-color: #f8f8f8;
  }

  &::after {
    display: none;
  }
}
</style>
