<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import { namespaceT } from '@/helps/namespace-t';
import { openToastError } from '@/helps/toast';

import UnBindWechartPopup from './unbind-wechart-popup.vue';

export default defineComponent({
  components: {
    UnBindWechartPopup,
  },

  setup() {
    const t = namespaceT('myReadCard.bindAccount');
    const showBindPopup = ref(false);
    const isBind = ref(false);

    function onClickItem() {
      if (isBind.value) {
        showBindPopup.value = true;
      }
    }

    function onLoaddata() {
      try {
        // TODO:加载微信绑定状态
        isBind.value = true;
      } catch (error) {
        openToastError(error.message);
        throw error;
      }
    }

    onMounted(() => {
      onLoaddata();
    });

    function onConfirmUnBind() {
      isBind.value = false;
    }

    return {
      t,
      showBindPopup,
      isBind,

      onClickItem,
      onLoaddata,
      onConfirmUnBind,
    };
  },
});
</script>


<template>
  <div
    class="item"
    @click="onClickItem"
  >
    <div class="left">
      <div class="spirte spirte-wechart" />
      <div>
        <div class="title">
          {{ t('wechartCity') }}
        </div>
        <div class="desc">
          {{ t('wechartServiceNo') }}
          <span class="blue">
            {{ t('focused') }}
          </span>
        </div>
      </div>
    </div>

    <div class="right">
      {{ isBind ? t('binded') : t('notBind') }}
      <div class="spirte spirte-account-bind-arrow" />
    </div>
  </div>
  <UnBindWechartPopup
    v-model="showBindPopup"
    @on-comfirm="onConfirmUnBind"
  />
</template>

<style lang="less" scoped>
.desc {
  margin-top: 0.02rem;
  color: #777;
  font-weight: 400;
  font-size: 0.11rem;

  .blue {
    margin-left: 0.04rem;
    color: var(--primary-color);
  }
}
</style>
