<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Switch } from 'vant';

import { namespaceT } from '@/helps/namespace-t';
import { openConfirmDialog } from '@/helps/dialog';

import MessageOrderItem from './components/message-order-item.vue';

export default defineComponent({
  components: {
    MessageOrderItem,
    VSwitch: Switch,
  },

  setup() {
    const t = namespaceT('myReadCard.messageOrder');
    const isExpiration = ref(true); // 微信到期提醒
    const isLoanNotify = ref(true); // 微信预借取书通知
    const isBorrowReturnMsg = ref(true); // 微信借还消息

    function handleOpen() {
      openConfirmDialog(t('openTip'), () => {
        // TODO:开启微信借还通知逻辑
        isBorrowReturnMsg.value = true;
      }, () => {
        isBorrowReturnMsg.value = false;
      });
    }

    function handleClose() {
      openConfirmDialog(t('closeTip'), () => {
        // TODO:关闭微信借还通知逻辑
        isBorrowReturnMsg.value = false;
      }, () => {
        isBorrowReturnMsg.value = true;
      });
    }

    function onUpdateSwicthValue(newVal) {
      if (newVal) {
        handleOpen();
      } else {
        handleClose();
      }
    }

    return {
      t,
      isExpiration,
      isLoanNotify,
      isBorrowReturnMsg,

      onUpdateSwicthValue,
    };
  },
});
</script>

<template>
  <div class="inner-page">
    <MessageOrderItem
      :title="t('expiration.title')"
      :desc="t('expiration.desc')"
      :is-open="isExpiration"
    />
    <MessageOrderItem
      :title="t('loanNotify.title')"
      :desc="t('loanNotify.desc')"
      :is-open="isLoanNotify"
    />
    <MessageOrderItem
      :title="t('borrowReturn.title')"
      :desc="t('borrowReturn.desc')"
    >
      <VSwitch
        v-model="isBorrowReturnMsg"
        class="sh-vant-switch"
        @update:model-value="onUpdateSwicthValue"
      />
    </MessageOrderItem>
    <div class="tip">
      <div class="spirte spirte-warning" />
      <span>
        {{ t('tip') }}
      </span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.tip {
  margin-top: 0.08rem;
  margin-left: 0.04rem;
  color: #777;
  font-weight: 400;
  font-size: 0.12rem;
  line-height: 1.5;

  >.spirte-warning {
    display: inline-block;
    margin-right: 0.04rem;
  }
}
</style>
