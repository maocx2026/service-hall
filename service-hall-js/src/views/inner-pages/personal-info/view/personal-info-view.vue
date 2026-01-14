<script lang="ts">
import { defineComponent, reactive, ref, onMounted, getCurrentInstance } from 'vue';
import { Button } from 'vant';

import { openToastError } from '@/helps/toast';
import { push } from '@/helps/navigation';
import { RouterName as RN } from '@/config/router';

import LoadingComp from '@/components/common/loading-comp.vue';
import PersonalInfo from './components/personal-info.vue';

import { createPersonalInfoModel } from './helps/data';
import { SampleData } from './helps/sample-data';

export default defineComponent({
  components: {
    VButton: Button,
    LoadingComp,
    PersonalInfo,
  },

  setup() {
    const vm = getCurrentInstance();
    const loading = ref(false);
    const model = reactive(createPersonalInfoModel());

    function onClickEdit() {
      push(vm.proxy.$router, {
        name: RN.PersonalInfoEdit,
      });
    }

    function onLoadData() {
      try {
        loading.value = true;
        // TODO:获取个人信息
        Object.assign(model, SampleData);
      } catch (error) {
        openToastError(error.message);
        throw error;
      } finally {
        loading.value = false;
      }
    }

    onMounted(() => {
      onLoadData();
    });

    return {
      loading,
      model,

      onClickEdit,
    };
  },
});
</script>


<template>
  <div class="inner-page">
    <LoadingComp v-if="loading" />

    <PersonalInfo
      v-else
      :model="model"
    />

    <div class="action-block">
      <VButton
        block
        type="primary"
        class="vant-primary-btn"
        @click="onClickEdit"
      >
        {{ $t('common.action.edit') }}
      </VButton>
    </div>
  </div>
</template>
