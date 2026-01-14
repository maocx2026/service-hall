<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue';

import { namespaceT } from '@/helps/namespace-t';
import { openToastError, openToastSuccess } from '@/helps/toast';

import FormComp from './components/form.vue';

import { createModel } from './helps/model';
import { MyBookCartSampleData } from './helps/data';

export default defineComponent({
  components: {
    FormComp,
  },

  setup() {
    const t = namespaceT('expressBookCart');
    const model = reactive(createModel());
    const saving = ref(false);

    function onSubmit() {
      try {
        // TODO:提交表单
        console.log('model', model);
        openToastSuccess(t('hint.saveSucc'));
      } catch (error) {
        openToastError(error.message);
        throw error;
      }
    }

    function onLoadData() {
      try {
        // TODO:加载我的书车列表和个人信息
        Object.assign(model, {
          bookList: MyBookCartSampleData,
        });
      } catch (error) {
        openToastError(error.message);
        throw error;
      }
    }

    onMounted(() => {
      onLoadData();
    });

    return {
      t,
      model,
      saving,

      onSubmit,
    };
  },
});
</script>


<template>
  <div class="recommend-book-add-page">
    <FormComp
      v-model="model"
      :saving="saving"
      @on-save="onSubmit"
    />
  </div>
</template>

<style lang="less" scoped>
.recommend-book-add-page {
  padding: 0.12rem;
}
</style>
