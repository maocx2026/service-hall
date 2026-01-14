<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue';

import { openToastError } from '@/helps/toast';
import { namespaceT } from '@/helps/namespace-t';

import LoadingComp from '@/components/common/loading-comp.vue';
import TopTotalPoint from './components/top-total-point.vue';
import NameItem from './components/name-item.vue';
import PointItem from './components/point-item.vue';
import PointItemPopup from './components/point-item-popup.vue';

import {
  getPointItemPopupTitle,
  getPointItemPopupContent,
  PointItemKey,
  getFullPoints,
} from './helps/data';

export default defineComponent({
  components: {
    LoadingComp,
    TopTotalPoint,
    NameItem,
    PointItem,
    PointItemPopup,
  },

  setup() {
    const t = namespaceT('points.credit');
    const model = reactive({
      name: '谢钟琪',
      totalPoint: 778,
      infoComplete: 100, // 信息完整度
      faithful: 24, // 忠诚度
      dynamic: 100, // 活跃度
      shine: 80, // 闪光度
      overPercent: '99.99%',
    });
    const loading = ref(false);
    const showPopup = ref(false);
    const popupTitle = ref('');
    const popupContent = ref('');

    function onLoadData() {
      try {
        loading.value = true;
        // TODO:查询积分数据
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

    function onClickHelp(key) {
      showPopup.value = true;
      popupTitle.value = getPointItemPopupTitle(key);
      popupContent.value = getPointItemPopupContent(key);
    }

    return {
      t,
      model,
      loading,
      showPopup,
      popupTitle,
      popupContent,

      PointItemKey,

      onClickHelp,

      getFullPoints,
    };
  },
});
</script>


<template>
  <LoadingComp v-if="loading" />
  <template v-else>
    <TopTotalPoint :points="model.totalPoint" />
    <div class="content-wrap">
      <NameItem
        :name="model.name"
        :over-percent="model.overPercent"
      />

      <div class="point-list">
        <PointItem
          :label="t('infoComplete')"
          :point="model.infoComplete"
          :total="getFullPoints(PointItemKey.INFO)"
          @on-help="onClickHelp(PointItemKey.INFO)"
        />
        <PointItem
          :label="t('faithful')"
          :point="model.faithful"
          :total="getFullPoints(PointItemKey.FAITHFUL)"
          @on-help="onClickHelp(PointItemKey.FAITHFUL)"
        />
        <PointItem
          :label="t('dynamic')"
          :point="model.dynamic"
          :total="getFullPoints(PointItemKey.DYNAMIC)"
          @on-help="onClickHelp(PointItemKey.DYNAMIC)"
        />
        <PointItem
          :label="t('shine')"
          :point="model.shine"
          :total="getFullPoints(PointItemKey.SHINE)"
          @on-help="onClickHelp(PointItemKey.SHINE)"
        />
      </div>
    </div>
  </template>

  <PointItemPopup
    v-model="showPopup"
    :title="popupTitle"
    :content="popupContent"
  />
</template>

<style lang="less" scoped>
.content-wrap {
  margin-top: -0.27rem;
  padding: 0 0.12rem;

  .point-list {
    margin-top: 0.08rem;
    padding: 0 0.14rem 0.12rem;
    background-color: #fff;
    border-radius: 0.08rem;
  }
}
</style>
