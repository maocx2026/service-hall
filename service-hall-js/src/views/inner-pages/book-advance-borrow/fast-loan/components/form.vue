<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Form, Button, Checkbox } from 'vant';

import { namespaceT } from '@/helps/namespace-t';

import RulePopup from './rule-popup.vue';
import SelectNoticeMethod from './select-notice-method.vue';
import SelectAddress from './select-address.vue';

export default defineComponent({
  components: {
    VForm: Form,
    VButton: Button,
    VCheckbox: Checkbox,
    RulePopup,
    SelectNoticeMethod,
    SelectAddress,
  },

  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    saving: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'on-save',
  ],

  setup(props, { emit }) {
    const t = namespaceT('bookAdvanceBorrow.add');
    const model = ref(props.modelValue);
    const agree = ref(false);
    const showRulePopup = ref(false);

    function onSubmit(values) {
      emit('on-save', values);
    }

    function onClickRule() {
      showRulePopup.value = true;
    }

    function onClosePopup() {
      showRulePopup.value = false;
    }

    function onAgreeRule() {
      onClosePopup();
      agree.value = true;
    }

    onMounted(() => {
      onClickRule();
    });

    return {
      t,
      model,
      agree,
      showRulePopup,

      onSubmit,
      onClickRule,
      onClosePopup,
      onAgreeRule,
    };
  },
});
</script>


<template>
  <VForm
    scroll-to-error
    class="vant-form"
    @submit="onSubmit"
  >
    <div class="form-block-title">
      {{ t('label.noticeMethods') }}
    </div>
    <SelectNoticeMethod
      v-model="model.noteType"
    />
    <div class="line" />
    <div class="form-block-title">
      {{ t('label.address') }}
    </div>
    <SelectAddress
      v-model="model"
    />

    <div class="action-block">
      <div class="full-width">
        <VCheckbox
          v-model="agree"
          class="checkbox-agree"
          shape="square"
        >
          <span class="agree-text">
            {{ t('text.agreeInLibBorrow[0]') }}
            <span
              class="link"
              @click.stop.prevent="onClickRule"
            >
              {{ t('text.agreeInLibBorrow[1]') }}
            </span>
          </span>
        </VCheckbox>
        <VButton
          block
          type="primary"
          native-type="submit"
          class="vant-primary-btn"
          :loading="saving"
          :disabled="!agree"
        >
          {{ t('btn.submitLoan') }}
        </VButton>
      </div>
    </div>
  </VForm>
  <RulePopup
    v-model="showRulePopup"
    @on-close="onClosePopup"
    @on-agree="onAgreeRule"
  />
</template>

<style lang="less" scoped>
.form-block-title {
  margin-bottom: 0.1rem;
  color: #222;
  font-weight: 500;
  font-size: 0.14rem;
}

.line {
  width: 200%;
  height: 0.01rem;
  margin: 0.2rem 0 0.23rem;
  background-color: fade(#000, 7);
  transform: scale(0.5) translateX(-50%);
}
</style>
