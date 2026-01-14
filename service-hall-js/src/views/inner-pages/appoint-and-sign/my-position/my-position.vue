<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { Button } from 'vant';

import { openToastError } from '@/helps/toast';

import LoadingComp from '@/components/common/loading-comp.vue';


export default defineComponent({
  components: {
    LoadingComp,
    VButton: Button,
  },

  setup() {
    const loading = ref(false);
    const model = reactive({
      wgs84: '',
      gcj01: '',
    });

    function onClickOpenMap() {
      // TODO:打开地图
      console.log('TODO:打开地图');
    }

    function onLoadData() {
      try {
        loading.value = true;
        // TODO:加载微信位置信息
        Object.assign(model, {
          wgs84: '113.95953369140625,22.591411590576172',
          gcj01: '113.96444702148438,22.588401794433594',
        });
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

      onClickOpenMap,
    };
  },
});
</script>


<template>
  <div class="inner-page">
    <LoadingComp v-if="loading" />
    <div
      v-else
      class="my-position-item"
    >
      <div class="item">
        wgs84: {{ model.wgs84 }}
      </div>
      <div class="item">
        gcj-01: {{ model.gcj01 }}
      </div>

      <VButton
        block
        type="primary"
        class="vant-primary-btn"
        @click="onClickOpenMap"
      >
        {{ $t('activitySign.action.openMap') }}
      </VButton>
    </div>
  </div>
</template>

<style lang="less" scoped>
.my-position-item {
  padding: 0.14rem;
  background-color: #fff;
  border-radius: 0.08rem;

  .item {
    margin-bottom: 0.04rem;
    color: #444;
    font-weight: 400;
    font-size: 0.14rem;
  }

  .vant-primary-btn {
    margin-top: 0.28rem;
  }
}
</style>
