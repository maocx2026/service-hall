<script lang="ts">
import { defineComponent, ref, onMounted, getCurrentInstance } from 'vue';
import { FloatingPanel, Button } from 'vant';

import { namespaceT } from '@/helps/namespace-t';
import { openToastError } from '@/helps/toast';
import { push } from '@/helps/navigation';
import { RouterName as RN } from '@/config/router';

import LoadingComp from '@/components/common/loading-comp.vue';

export default defineComponent({
  components: {
    VFloatingPanel: FloatingPanel,
    VButton: Button,
    LoadingComp,
  },

  setup() {
    const vm = getCurrentInstance();
    const loading = ref(false);
    const detailPabelRef = ref();
    const anchors = ref([
      256,
      448,
    ]);
    const height = ref(anchors.value[0]);

    function onViewBookList() {
      push(vm.proxy.$router, {
        name: RN.DiscoverBookList,
      });
    }

    function onLoadData() {
      try {
        loading.value = true;
        // TODO:加载详情信息
      } catch (error) {
        openToastError(error.message);
        throw error;
      } finally {
        loading.value = false;
      }
    }

    onMounted(async () => {
      await onLoadData();
      anchors.value[1] = detailPabelRef.value.offsetHeight + 33;
    });

    return {
      loading,
      t: namespaceT('discover'),
      height,
      anchors,
      detailPabelRef,

      onViewBookList,
    };
  },
});
</script>


<template>
  <VFloatingPanel
    v-model:height="height"
    :anchors="anchors"
    class="vant-floating-panel"
  >
    <div
      ref="detailPabelRef"
      class="panel-detail"
    >
      <LoadingComp v-if="loading" />
      <template v-else>
        <div class="header">
          <div class="lib-name">
            <div class="name">
              深圳图书馆
            </div>
            <div class="lib-code">
              {{ t('libCode') }}：044005
            </div>
          </div>
          <div class="location">
            <div class="spirte spirte-activity-location" />
            深圳市福田区福中一路2001号
          </div>
        </div>

        <div class="content">
          <div class="cont-title">
            {{ t('contactPhone') }}
          </div>
          <div class="cont-txt">
            0755-82841211 <br>
            0755-82841212
          </div>
          <div class="cont-title">
            {{ t('serviceTime') }}
          </div>
          <div class="cont-txt">
            网上图书馆、自助图书馆全天候服务0:00至24:00 <br>
            南书房、讲读厅：周一至周日7:00-23:00 <br>
            周二至周日主馆舍开放时间： <br>
            一楼至四楼：9:00-21:00 <br>
            五楼至六楼：9:00-17:00 <br>
            少儿服务区：周二至周五12:00-18:00；周末、暑假期间 9:00-20:00 <br>
            法定节假日：请关注深圳图书馆服务通知 <br>
          </div>
        </div>

        <VButton
          block
          type="primary"
          class="vant-primary-btn"
          @click="onViewBookList"
        >
          {{ t('viewBookList') }}
        </VButton>
      </template>
    </div>
  </VFloatingPanel>
</template>

<style lang="less" scoped>
:deep(.van-floating-panel) {
  border-top-left-radius: 0.24rem;
  border-top-right-radius: 0.24rem;
}

:deep(.van-floating-panel__header) {
  height: 0.33rem;
}

:deep(.van-floating-panel__header-bar) {
  width: 0.45rem;
}

.panel-detail {
  padding: 0 0.2rem 0.34rem;

  .header {
    padding-bottom: 0.16rem;
    border-bottom: 0.005rem solid fade(#000, 7);

    .lib-name {
      display: flex;
      align-items: center;

      .name {
        margin-right: 0.06rem;
        color: #222;
        font-weight: 500;
        font-size: 0.18rem;
        line-height: 1.4;
      }

      .lib-code {
        padding: 0.02rem 0.04rem;
        color: var(--primary-color);
        font-weight: 400;
        font-size: 0.1rem;
        border-radius: 0.02rem;
        border: 0.005rem solid var(--primary-color);
      }
    }

    .location {
      display: flex;
      align-items: center;
      gap: 0.04rem;
      margin-top: 0.04rem;
      color: #777;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 1.4;
    }
  }

  .content {
    .cont-title {
      margin-top: 0.16rem;
      margin-bottom: 0.04rem;
      color: #444;
      font-weight: 500;
      font-size: 0.14rem;
      line-height: 1.5;
    }

    .cont-txt {
      color: #777;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 1.5;
    }
  }

  .vant-primary-btn {
    margin-top: 0.24rem;
  }
}
</style>
