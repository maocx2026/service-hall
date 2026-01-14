<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue';
import { Checkbox, Button } from 'vant';

import { namespaceT } from '@/helps/namespace-t';
import { push } from '@/helps/navigation';
import { openMessagerDialog } from '@/helps/dialog';
import { RouterName as RN } from '@/config/router';

import AgreementPopup from './agreement-popup.vue';

export default defineComponent({
  components: {
    VCheckbox: Checkbox,
    AgreementPopup,
    VButton: Button,
  },

  setup() {
    const vm = getCurrentInstance();
    const t = namespaceT('applyVirtualltCard');
    const agreed = ref(false);
    const showAgreePopup = ref(false);

    function onShowAgreementPopup() {
      showAgreePopup.value = true;
    }

    function onClickFaceVerify() {
      if (!agreed.value) {
        openMessagerDialog(t('agreeTip.content'));
        return;
      }
      push(vm.proxy.$router, {
        name: RN.FaceVerify,
      });
    }

    function onCloseAgreementPopup() {
      showAgreePopup.value = false;
    }

    function onAgreeAgreementPopup() {
      agreed.value = true;
      onCloseAgreementPopup();
    }

    return {
      t,
      agreed,
      showAgreePopup,

      onShowAgreementPopup,
      onClickFaceVerify,
      onCloseAgreementPopup,
      onAgreeAgreementPopup,
    };
  },
});
</script>

<template>
  <div class="info-box">
    <div class="info-item">
      {{ t('agreeInfo[0]') }}
    </div>
    <div class="info-item">
      {{ t('agreeInfo[1]') }}
    </div>
    <div class="info-item">
      <VCheckbox
        v-model="agreed"
        icon-size="18px"
        checked-color="#4D65CB"
      >
        {{ t('agreeCheck[0]') }}
        <a
          href="#"
          class="link"
          @click.stop.prevent="onShowAgreementPopup"
        >
          {{ t('agreeCheck[1]') }}
        </a>
      </VCheckbox>
    </div>

    <VButton
      block
      type="primary"
      class="vant-primary-btn"
      @click="onClickFaceVerify"
    >
      {{ t('faceVerify') }}
    </VButton>

    <AgreementPopup
      v-model="showAgreePopup"
      @on-close="onCloseAgreementPopup"
      @on-agree="onAgreeAgreementPopup"
    />
  </div>
</template>

<style lang="less" scoped>
.info-box {
  padding: 0 0.4rem;
  color: #fff;
  font-weight: 400;
  font-size: 0.14rem;
  line-height: 1.85;

  .info-item {
    :deep(.van-radio__label) {
      font-size: 0.15rem;
    }

    .link {
      font-size: 0.15rem;
      color: #f5aa52;
    }
  }
}

:deep(.van-checkbox) {
  align-items: flex-start;
  margin: 0.12rem 0;

  .van-checkbox__icon {
    position: relative;
    top: 3px;
  }
}

:deep(.van-checkbox__label) {
  color: #fff;
  font-weight: 400;
  font-size: 0.14rem;
}

.vant-primary-btn {
  background-color: fade(#fff, 10);
  border: 0;
}
</style>
