<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue';
import { Loading } from 'vant';

import { openToastError } from '@/helps/toast';

import ActivityDetailHeader from './components/activity-detail-header.vue';
import ActivityDetailBody from './components/activity-detail-body.vue';

import { createDetailModel, createActivityDetailData } from './helps/data';

export default defineComponent({
  components: {
    VLoading: Loading,
    ActivityDetailHeader,
    ActivityDetailBody,
  },

  setup() {
    const loading = ref(false);
    const model = reactive(createDetailModel());

    function onLoadData() {
      try {
        loading.value = true;
        // TODO:加载活动详情数据
        Object.assign(model, createActivityDetailData());
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
      model,
      loading,
    };
  },
});
</script>


<template>
  <div class="activity-detail">
    <VLoading v-if="loading" />

    <template v-else>
      <ActivityDetailHeader :model="model" />

      <ActivityDetailBody :model="model" />
    </template>
  </div>
</template>

<style lang="less" scoped>
.activity-detail {
  min-height: 100vh;
  background-color: #fff;
}
</style>
