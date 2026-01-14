<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

import { namespaceT } from '@/helps/namespace-t';
import { openToastError } from '@/helps/toast';

import FormComp from './components/form.vue';

import { createModel } from './helps/model';

export default defineComponent({
  components: {
    FormComp,
  },

  setup() {
    const t = namespaceT('recommendPurchase.add');
    const model = reactive(createModel());
    const saving = ref(false);

    function onSubmit(values) {
      try {
        saving.value = true;
        console.log('TODO:提交', values);
      } catch (error) {
        openToastError(error.message);
        throw error;
      } finally {
        saving.value = false;
      }
    }

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
