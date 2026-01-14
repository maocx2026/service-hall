<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import { namespaceT } from '@/helps/namespace-t';
import { openToastError } from '@/helps/toast';

import BindVolunteerPopup from './bind-volunteer-popup.vue';
import UnBindvolunteerIdPopup from './unbind-volunteer-id-popup.vue';

export default defineComponent({
  components: {
    BindVolunteerPopup,
    UnBindvolunteerIdPopup,
  },

  setup() {
    const t = namespaceT('myReadCard.bindAccount');
    const showBindPopup = ref(false);
    const showUnBindPopup = ref(false);
    const isBind = ref(false);
    const volunteerId = ref('');

    function onClickItem() {
      if (isBind.value) {
        // 已绑定时
        showUnBindPopup.value = true;
      } else {
        // 未绑定时
        showBindPopup.value = true;
      }
    }

    function onLoaddata() {
      try {
        // TODO:加载义工号绑定状态
        isBind.value = false;
        volunteerId.value = '';
      } catch (error) {
        openToastError(error.message);
        throw error;
      }
    }

    onMounted(() => {
      onLoaddata();
    });

    function onConfirmBind(val) {
      isBind.value = true;
      volunteerId.value = val;
    }

    function onConfirmUnBind() {
      isBind.value = false;
      volunteerId.value = '';
    }

    return {
      t,
      showBindPopup,
      showUnBindPopup,
      isBind,
      volunteerId,

      onClickItem,
      onLoaddata,
      onConfirmBind,
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
      <div class="spirte spirte-volunteer" />
      <div class="title">
        {{ t('volunteerId') }}
        <span v-if="isBind">
          : {{ volunteerId }}
        </span>
      </div>
    </div>

    <div class="right">
      {{ isBind ? t('binded') : t('notBind') }}
      <div class="spirte spirte-account-bind-arrow" />
    </div>
  </div>
  <BindVolunteerPopup
    v-model="showBindPopup"
    @on-confirm="onConfirmBind"
  />
  <UnBindvolunteerIdPopup
    v-model="showUnBindPopup"
    @on-confirm="onConfirmUnBind"
  />
</template>
