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
      阅读积分简介
    </div>
    <div class="content">
      <div class="cont">
        读者阅读积分是根据您在图书馆之城借阅、捐赠换书、参与活动和志愿服务等行为，按实际发生情况累计。 <br>
        书刊借阅一册积1分，当天借还不算积分。深圳捐赠换书中心换入、换出、捐赠图书一册积1分，每天最高不超过5分。 <br>
        后续参与活动和志愿服务等也将计入积分。 <br>
        阅读积分每日动态更新。 <br>
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
