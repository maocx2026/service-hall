<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from 'vue';
import { Form, Field, Button } from 'vant';

import { namespaceT } from '@/helps/namespace-t';
import { goBack } from '@/helps/navigation';
import { EMAIL_PATTERN, MOBILE_PATTERN } from '@/consts/pattern';

import TimeCountDownBtn from './time-count-down-btn.vue';


export default defineComponent({
  components: {
    VForm: Form,
    VField: Field,
    VButton: Button,
    TimeCountDownBtn,
  },

  props: {
    modelValue: {
      type: Object,
      default: () => {},
    },

    saving: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'on-save',
    'on-send-code',
  ],

  setup(props, { emit }) {
    const vm = getCurrentInstance();
    const t = namespaceT('personalInfo');
    const model = ref(props.modelValue);
    const isEditMobile = ref(false);
    const formRef = ref();

    function onClickEditMobile() {
      isEditMobile.value = true;
    }

    function onClickCancel() {
      goBack(vm.proxy.$router);
    }

    function onSubmit(values) {
      emit('on-save', values);
    }

    function onSendCode() {
      return new Promise((resolve, reject) => {
        formRef.value.validate('mobile')
          .then((r) => {
            emit('on-send-code');
            resolve(r);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }

    return {
      t,
      model,
      isEditMobile,
      formRef,

      EMAIL_PATTERN,
      MOBILE_PATTERN,

      onSubmit,
      onClickCancel,
      onSendCode,
      onClickEditMobile,
    };
  },
});
</script>


<template>
  <VForm
    ref="formRef"
    scroll-to-error
    class="vant-form"
    @submit="onSubmit"
  >
    <div class="form-block">
      <VField
        v-model="model.name"
        name="name"
        :label="t('label.name')"
        class="vant-field"
        disabled
      />
      <VField
        v-model="model.idCard"
        name="idCard"
        :label="t('label.idCard')"
        class="vant-field"
        disabled
      />
      <VField
        v-model="model.cardNo"
        name="cardNo"
        :label="t('label.cardNo')"
        class="vant-field"
        disabled
      />
      <VField
        v-if="isEditMobile"
        v-model="model.mobile"
        name="mobile"
        :label="t('label.mobile')"
        :placeholder="t('place.mobile')"
        class="vant-field ft-0 no-bottom-border"
        :rules="[{ pattern: MOBILE_PATTERN, message: t('error.mobile') }]"
      >
        <template #button>
          <TimeCountDownBtn
            :click-fnc="onSendCode"
          />
        </template>
      </VField>
      <VField
        v-else
        v-model="model.mobile"
        name="mobile"
        :label="t('label.mobile')"
        :placeholder="$t('common.placeholder.notInput')"
        class="vant-field"
        readonly
      >
        <template #button>
          <a
            class="text-btn"
            @click="onClickEditMobile"
          >
            {{ $t('common.action.modify') }}
          </a>
        </template>
      </VField>
      <VField
        v-if="isEditMobile"
        v-model="model.checkCode"
        name="checkCode"
        :placeholder="t('place.checkCode')"
        class="vant-field checkcode-field"
        :rules="[{ required: true, message: t('place.checkCode') }]"
      />
      <VField
        v-model="model.phone"
        name="phone"
        :label="t('label.phone')"
        :placeholder="t('place.phone')"
        class="vant-field"
      />
      <VField
        v-model="model.email"
        name="email"
        :label="t('label.email')"
        :placeholder="t('place.email')"
        class="vant-field"
        :rules="[{ pattern: EMAIL_PATTERN, message: t('error.email') }]"
      />
      <VField
        v-model="model.address"
        name="address"
        :label="t('label.address')"
        :placeholder="t('place.address')"
        class="vant-field"
        type="textarea"
        rows="1"
        autosize
      />

      <div class="action-block">
        <VButton
          block
          type="default"
          class="vant-primary-btn"
          @click="onClickCancel"
        >
          {{ $t('common.action.cancel') }}
        </VButton>

        <VButton
          block
          type="primary"
          native-type="submit"
          class="vant-primary-btn"
          :loading="saving"
        >
          {{ $t('common.action.save') }}
        </VButton>
      </div>
    </div>
  </VForm>
</template>

<style lang="less" scoped>
.ft-0 :deep(.van-field__button) {
  font-size: 0;
}

.checkcode-field {
  padding-top: 0;

  :deep(.van-field__control) {
    height: 0.53rem;
    padding: 0 0.12rem;
    border-radius: 0.05rem;
    background-color: #f8f8f8;
  }
}

.no-bottom-border::after {
  display: none;
}
</style>
