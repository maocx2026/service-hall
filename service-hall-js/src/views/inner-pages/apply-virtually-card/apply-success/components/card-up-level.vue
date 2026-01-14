<script lang="ts">
import { defineComponent, ref } from 'vue';
import { RadioGroup, Radio, Button } from 'vant';

import { namespaceT } from '@/helps/namespace-t';
import { openToastError } from '@/helps/toast';

import { getAuthTypeOptions } from '../helps/sample-data';

export default defineComponent({
  components: {
    VButton: Button,
    VRadioGroup: RadioGroup,
    VRadio: Radio,
  },

  setup() {
    const t = namespaceT('applyVirtualltCard.success');
    const saving = ref(false);
    const authType = ref('');
    const authTypeLists = ref(getAuthTypeOptions());

    function onWechartPay() {
      try {
        saving.value = true;
        // TODO:微信支付
        console.log('authType', authType.value);
      } catch (error) {
        openToastError(error.message);
        throw error;
      } finally {
        saving.value = false;
      }
    }

    return {
      t,
      authType,
      saving,

      authTypeLists,

      onWechartPay,
    };
  },
});
</script>

<template>
  <div class="select-options">
    <VRadioGroup
      v-model="authType"
      shape="dot"
      class="radio-group"
    >
      <VRadio
        v-for="item in authTypeLists"
        :key="item.key"
        :name="item.key"
        class="radio"
      >
        {{ item.text }}
      </VRadio>
    </VRadioGroup>
  </div>

  <VButton
    v-if="authType"
    block
    type="primary"
    class="vant-primary-btn"
    :loading="saving"
    icon="wechat-pay"
    @click="onWechartPay"
  >
    {{ t('wechartPay') }}
  </VButton>
</template>

<style lang="less" scoped>
.radio-group {
  margin-top: 0.2rem;

  .radio {
    margin-bottom: 0.08rem;

    :deep(.van-radio__label) {
      color: #fff;
      font-weight: 400;
      font-size: 0.14rem;
    }

    :deep(.van-radio__icon--dot) {
      background-color: #fff;
    }

    :deep(.van-radio__icon--checked.van-radio__icon--dot) {
      border-color: #fff;

      .van-radio__icon--dot__icon {
        background-color: var(--primary-color);
      }
    }
  }
}

.vant-primary-btn {
  margin-top: 0.2rem;
  border: 0;
}
</style>
