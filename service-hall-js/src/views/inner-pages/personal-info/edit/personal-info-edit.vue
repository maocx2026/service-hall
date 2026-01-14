<script lang="ts">
import { defineComponent, reactive, ref, onMounted, getCurrentInstance } from 'vue';

import { namespaceT } from '@/helps/namespace-t';
import { openToastError, openToastSuccess } from '@/helps/toast';
import { goBack } from '@/helps/navigation';

import LoadingComp from '@/components/common/loading-comp.vue';
import EditForm from './components/edit-form.vue';

import { createPersonalInfoModel } from './helps/data';
import { SampleData } from './helps/sample-data';

export default defineComponent({
  components: {
    LoadingComp,
    EditForm,
  },

  setup() {
    const vm = getCurrentInstance();
    const t = namespaceT('personalInfo');
    const loading = ref(false);
    const saving = ref(false);
    const model = reactive(createPersonalInfoModel());

    function onSave(values) {
      try {
        saving.value = true;
        // TODO:保存逻辑
        console.log('values', values);
        openToastSuccess(t('hint.saveSucc'));
        goBack(vm.proxy.$router);
      } catch (error) {
        openToastError(error.message);
        throw error;
      } finally {
        saving.value = false;
      }
    }

    function onSendCheckCode() {
      // TODO:发送验证码逻辑
      console.log('TODO:发送验证码');
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
      saving,

      onSave,
      onSendCheckCode,
    };
  },
});
</script>


<template>
  <div class="inner-page">
    <LoadingComp v-if="loading" />

    <EditForm
      v-else
      v-model="model"
      :saving="saving"
      @on-save="onSave"
      @on-send-code="onSendCheckCode"
    />
  </div>
</template>
