<script lang="ts">
import { defineComponent, toRef } from 'vue';
import { Popup, Button } from 'vant';

import { namespaceT } from '@/helps/namespace-t';

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
  ],

  setup(props, { emit }) {
    const t = namespaceT('points.read');
    const show = toRef(props, 'modelValue');

    function onClickClose() {
      emit('update:modelValue', false);
    }
    return {
      t,
      show,

      onClickClose,
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
      信用分简介
    </div>
    <div class="content">
      <div class="cont">
        图书馆之城读者信用分是根据您在图书馆之城注册、登录网络/移动平台、借阅、捐赠换书、参与读者活动和志愿服务等行为，
        以及遵守图书馆规则的情况，通过大数据算法，对您的信用水平给出的综合评估。评分越高，表明您的信用越好。信用分每月动态更新。
      </div>

      <div class="actions">
        <VButton
          block
          type="primary"
          class="vant-primary-btn"
          @click="onClickClose"
        >
          {{ $t('common.action.close') }}
        </VButton>
      </div>
    </div>
  </VPopup>
</template>

<style lang="less" scoped>
.cont {
  text-indent: 0.3rem;
  white-space: pre-line;
}
</style>
