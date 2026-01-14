<script lang="ts">
import { defineComponent, getCurrentInstance, reactive } from 'vue';
import { Form, Field, Button } from 'vant';

import { namespaceT } from '@/helps/namespace-t';
import { push } from '@/helps/navigation';
import { MOBILE_PATTERN, ID_CARD_PATTERN } from '@/consts/pattern';
import { RouterName as RN } from '@/config/router';

import { createFormModel } from './helps/data';

export default defineComponent({
  components: {
    VForm: Form,
    VField: Field,
    VButton: Button,
  },

  setup() {
    const vm = getCurrentInstance();
    const t = namespaceT('applyVirtualltCard.apply');
    const model = reactive(createFormModel());

    function onSubmit(values) {
      // TODO：下一步，人脸验证
      console.log('values', values);
      push(vm.proxy.$router, {
        name: RN.ApplyVirtuallyCardSucc,
      });
    }

    return {
      t,
      model,

      MOBILE_PATTERN,
      ID_CARD_PATTERN,

      onSubmit,
    };
  },
});
</script>


<template>
  <div class="inner-page">
    <div class="tip">
      {{ t('tip') }}
    </div>
    <VForm
      scroll-to-error
      class="vant-form"
      @submit="onSubmit"
    >
      <VField
        v-model="model.name"
        name="name"
        left-icon="contact-o"
        :placeholder="t('name')"
        required
        class="vant-field"
        :rules="[{ required: true, message: t('name') }]"
      />
      <VField
        v-model="model.idCard"
        name="idCard"
        left-icon="idcard"
        :placeholder="t('idCard')"
        required
        class="vant-field"
        :rules="[
          { required: true, message: t('idCard') },
          { pattern: ID_CARD_PATTERN, message: t('idCardError') },
        ]"
      />
      <VField
        v-model="model.mobile"
        name="mobile"
        left-icon="phone-o"
        :placeholder="t('mobile')"
        required
        class="vant-field"
        :rules="[
          { required: true, message: t('mobile') },
          { pattern: MOBILE_PATTERN, message: t('mobileError') },
        ]"
      />

      <div class="warn-tip">
        <div class="title">
          {{ t('warmTip.title') }}
        </div>
        <div class="content">
          {{ t('warmTip.content') }}
        </div>
      </div>
      <div class="action-block">
        <VButton
          block
          type="primary"
          native-type="submit"
          class="vant-primary-btn"
        >
          {{ t('nextStep') }}
        </VButton>
      </div>
    </VForm>
  </div>
</template>

<style lang="less" scoped>
.vant-form {
  .vant-field {
    :deep(.van-cell__value) {
      .van-field__control {
        padding-left: 0.12rem;
        text-align: left;
      }
    }

    :deep(.van-field__error-message) {
      padding-left: 0.12rem;
      text-align: left;
    }
  }
}

.tip {
  margin: 0.2rem 0;
  color: #777;
  font-weight: 400;
  font-size: 0.16rem;
  line-height: 1.5;
  text-indent: 0.36rem;
}

.warn-tip {
  margin: 0.2rem;
  color: #777;
  font-weight: 400;
  font-size: 0.15rem;
  line-height: 1.5;

  .title {
    font-weight: 600;
    color: var(--primary-color);
  }
}
</style>
