<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue';
import { Form, Field, Button } from 'vant';

import { namespaceT } from '@/helps/namespace-t';
import { openToastError } from '@/helps/toast';
import { openErrorDialog } from '@/helps/dialog';

import { cretaeModel } from '../helps/model';

export default defineComponent({
  components: {
    VForm: Form,
    VField: Field,
    VButton: Button,
  },

  emits: [
    'on-find-password',
  ],

  setup(props, { emit }) {
    const t = namespaceT('login');
    const model = reactive(cretaeModel());
    const saving = ref(false);
    const hasError = ref(false);
    const errorMessage = ref('');

    function onClickFindPassword() {
      if (!model.idCardNo) {
        openErrorDialog(t('usernameRequired'));
        return;
      }
      emit('on-find-password', model.idCardNo);
    }

    function onSubmit(values) {
      try {
        saving.value = true;
        // TODO:登录逻辑
        console.log('values', values);
      } catch (error) {
        openToastError(error.message);
        hasError.value = true;
        errorMessage.value = error.message;
        throw error;
      } finally {
        saving.value = false;
      }
    }

    const btnDisabled = computed(() => {
      return !(model.idCardNo && model.password);
    });

    return {
      t,
      model,
      saving,
      btnDisabled,
      hasError,
      errorMessage,

      onSubmit,
      onClickFindPassword,
    };
  },
});
</script>

<template>
  <VForm
    scroll-to-error
    class="login-form"
    :class="{'has-error': hasError}"
    @submit="onSubmit"
  >
    <VField
      v-model="model.idCardNo"
      name="idCardNo"
      :placeholder="t('username')"
      required
      class="login-field"
      :rules="[{ required: true, message: t('usernameRequired') }]"
    />
    <VField
      v-model="model.password"
      name="password"
      :placeholder="t('password')"
      required
      type="password"
      class="login-field"
      :rules="[{ required: true, message: t('passwordRequired') }]"
    />
    <div class="find-paddword">
      <div class="error-msg">
        <template v-if="hasError">
          {{ errorMessage }}
        </template>
      </div>
      <a
        href="#"
        class="link"
        @click.stop.prevent="onClickFindPassword"
      >
        {{ t('findPassword') }}
      </a>
    </div>
    <VButton
      block
      type="primary"
      native-type="submit"
      class="vant-primary-btn"
      :disabled="btnDisabled"
    >
      {{ t('login') }}
    </VButton>
  </VForm>
</template>

<style lang="less" scoped>
.find-paddword {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.1rem;
  margin-bottom: 0.2rem;
  text-align: right;

  a.link {
    color: #777;
    font-weight: 400;
    font-size: 0.13rem;
    line-height: 1.45;
  }

  .error-msg {
    color: var(--red-color);
    font-weight: 400;
    font-size: 0.13rem;
  }
}
</style>
