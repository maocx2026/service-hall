<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';

import { openToastError } from '@/helps/toast';

import LoadingComp from '@/components/common/loading-comp.vue';
import DetailTopPart from './components/detail-top-part.vue';
import ContentPart from './components/content-part.vue';

import { createBookDetailModel } from './helps/data';
import { SampleData } from './helps/sample-data';

export default defineComponent({
  components: {
    LoadingComp,
    DetailTopPart,
    ContentPart,
  },

  setup() {
    const loading = ref(false);
    const model = reactive(createBookDetailModel());

    function onLoaddata() {
      try {
        loading.value = true;
        // TODO:根据路由信息加载图书详情
        console.log('TODO:根据路由信息加载图书详情');
        Object.assign(model, SampleData);
      } catch (error) {
        openToastError(error.message);
        throw error;
      } finally {
        loading.value = false;
      }
    }

    onMounted(() => {
      onLoaddata();
    });

    return {
      loading,
      model,

      onLoaddata,
    };
  },
});
</script>


<template>
  <LoadingComp v-if="loading" />
  <template v-else>
    <DetailTopPart v-model="model" />

    <ContentPart v-model="model" />
  </template>
</template>
