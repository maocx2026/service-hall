<script lang="ts">
import { defineComponent, ref, onMounted, reactive, getCurrentInstance } from 'vue';
import { Button } from 'vant';

import { namespaceT } from '@/helps/namespace-t';
import { openToastError } from '@/helps/toast';
import { push, goBack } from '@/helps/navigation';
import { RouterName as RN } from '@/config/router';

import LoadingComp from '@/components/common/loading-comp.vue';
import TipSwiper from './components/tip-swiper.vue';
import AddSuccess from './components/add-success.vue';
import HasAdded from './components/has-added.vue';
import FetchLimit from './components/fetch-limit.vue';

import { SampleData } from './helps/sample-data';
import { BOOK_CART_ADD_STATUS } from './helps/data';

export default defineComponent({
  components: {
    LoadingComp,
    TipSwiper,
    VButton: Button,
    AddSuccess,
    HasAdded,
    FetchLimit,
  },

  setup() {
    const vm = getCurrentInstance();
    const t = namespaceT('bookAdvanceBorrow.cart');
    const curCompt = ref('AddSuccess');
    const loading = ref(false);
    const model = reactive({
      status: BOOK_CART_ADD_STATUS.SUCCESS,
    });

    function backToSearchResult() {
      goBack(vm.proxy.$router);
    }

    function onViewBookCart() {
      push(vm.proxy.$router, {
        name: RN.ExpressBookCart,
      });
    }

    const comptMapper = new Map([
      [BOOK_CART_ADD_STATUS.SUCCESS, 'AddSuccess'],
      [BOOK_CART_ADD_STATUS.HAS_ADDED, 'HasAdded'],
      [BOOK_CART_ADD_STATUS.FETCH_LIMIT, 'FetchLimit'],
    ]);

    function onLoaddata() {
      try {
        loading.value = true;
        // TODO:加入书车逻辑
        Object.assign(model, SampleData);
        curCompt.value = comptMapper.get(model.status);
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
      t,
      curCompt,
      loading,
      model,

      backToSearchResult,
      onViewBookCart,
    };
  },
});
</script>


<template>
  <div class="add-cart-page">
    <LoadingComp v-if="loading" />
    <component
      :is="curCompt"
      v-else
      :model="model"
    />

    <TipSwiper />

    <div class="action-block">
      <VButton
        block
        type="primary"
        class="vant-primary-btn"
        @click="backToSearchResult"
      >
        {{ t('btn.backSearchReulust') }}
      </VButton>
      <VButton
        block
        type="primary"
        class="vant-primary-btn"
        @click="onViewBookCart"
      >
        {{ t('btn.viewBookCart') }}
      </VButton>
    </div>
  </div>
</template>

<style lang="less" scoped>
.add-cart-page {
  padding: 0.12rem;

  :deep(.result-wrap) {
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 2.52rem;
    min-height: calc(100vh - 0.82rem - 0.36rem - 0.62rem);
    margin: 0 auto;
    padding: 25% 0 0;
    text-align: center;
    line-height: 1.45;

    .title {
      margin-top: 0.2rem;
      margin-bottom: 0.12rem;
      color: #222;
      font-weight: 500;
      font-size: 0.18rem;
    }

    .sub-title {
      color: #777;
      font-weight: 400;
      font-size: 0.14rem;
    }
  }
}
</style>
