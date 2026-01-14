<script lang="ts">
import { defineComponent, reactive, ref, onMounted, getCurrentInstance } from 'vue';

import { openToastError } from '@/helps/toast';
import { namespaceT } from '@/helps/namespace-t';
import { push } from '@/helps/navigation';
import { RouterName as RN } from '@/config/router';

import LoadingComp from '@/components/common/loading-comp.vue';
import TopTotalPoint from './components/top-total-point.vue';
import NameItem from './components/name-item.vue';
import PointItem from './components/point-item.vue';
import PointItemPopup from './components/point-item-popup.vue';

import { getPointItemPopupTitle, getPointItemPopupContent, PointItemKey } from './helps/data';

export default defineComponent({
  components: {
    LoadingComp,
    TopTotalPoint,
    NameItem,
    PointItem,
    PointItemPopup,
  },

  setup() {
    const vm = getCurrentInstance();
    const t = namespaceT('points.read');
    const model = reactive({
      name: '谢钟琪',
      totalPoint: 285,
      yearPoint: 40,
      availablePoint: 24,
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

    function onMyFinance() {
      push(vm.proxy.$router, {
        name: RN.MyFinance,
      });
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
      onMyFinance,
    };
  },
});
</script>


<template>
  <LoadingComp v-if="loading" />
  <template v-else>
    <TopTotalPoint :points="model.totalPoint" />
    <div class="content-wrap">
      <NameItem :name="model.name" />

      <div class="point-list">
        <PointItem
          :label="t('totalPoint')"
          :point="model.totalPoint"
          @on-help="onClickHelp(PointItemKey.TOTAL)"
        />
        <PointItem
          :label="t('thisYearPoint')"
          :point="model.yearPoint"
          @on-help="onClickHelp(PointItemKey.YEAR)"
        />
        <PointItem
          :label="t('availablePoint')"
          :point="model.availablePoint"
          @on-help="onClickHelp(PointItemKey.AVAILABLE)"
        />
      </div>

      <div class="available-point-tip">
        <div class="spirte spirte-warning" />
        <span>
          {{ t('availablePointTip[0]') }}
          <a
            href="#"
            class="link"
            @click.stop.prevent="onMyFinance"
          >
            {{ t('availablePointTip[1]') }}
          </a>
          {{ t('availablePointTip[2]') }}
        </span>
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
    padding: 0 0.14rem;
    background-color: #fff;
    border-radius: 0.08rem;
  }

  .available-point-tip {
    display: flex;
    align-items: center;
    gap: 0.03rem;
    margin-top: 0.1rem;
    margin-left: 0.04rem;
    color: #777;
    font-weight: 400;
    font-size: 0.12rem;

    .link {
      color: var(--primary-color);
      text-decoration: underline;
    }
  }
}
</style>
