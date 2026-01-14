<script lang="ts">
import { defineComponent, ref, reactive, onMounted, getCurrentInstance } from 'vue';

import { namespaceT } from '@/helps/namespace-t';
import { push } from '@/helps/navigation';
import { RouterName as RN } from '@/config/router';

import LoadingComp from '@/components/common/loading-comp.vue';
import PopupSuccPage from './components/popup-succ-page.vue';
import PopupErrorPage from './components/popup-error-page.vue';
import FormComp from './components/form.vue';

import { createModel, createSuccPopup, createErrorPopup } from './helps/data';
import { SampleData } from './helps/sample-data';

export default defineComponent({
  components: {
    LoadingComp,
    PopupSuccPage,
    PopupErrorPage,
    FormComp,
  },

  setup() {
    const vm = getCurrentInstance();
    const t = namespaceT('bookAdvanceBorrow.add');
    const loading = ref(false);
    const saving = ref(false);
    const model = reactive(createModel());
    const succPopup = reactive(createSuccPopup());
    const errorPopup = reactive(createErrorPopup());

    function onShowSuccPopup(address) {
      Object.assign(succPopup, {
        shown: true,
        address,
      });
      Object.assign(errorPopup, createErrorPopup());
    }

    function onShowErrorPopup(errorMsg) {
      Object.assign(succPopup, createSuccPopup());
      Object.assign(errorPopup, {
        shown: true,
        errorMsg,
      });
    }

    function onLoadData() {
      try {
        loading.value = true;
        // TODO:加载页面信息
        Object.assign(model, SampleData);
      } catch (error) {
        onShowErrorPopup(error.message);
        throw error;
      } finally {
        loading.value = false;
      }
    }

    onMounted(() => {
      onLoadData();
    });

    function onViewOrder() {
      push(vm.proxy.$router, {
        name: RN.AdvanceBorrowAndLoan,
      });
    }

    function onSave() {
      try {
        saving.value = true;
        // TODO:提交预借
        console.log('TODO:提交预借', model);
        onShowSuccPopup(model.serviceAddr);
      } catch (error) {
        onShowErrorPopup(error.message);
        throw error;
      } finally {
        saving.value = false;
      }
    }

    return {
      t,
      loading,
      succPopup,
      errorPopup,
      model,
      saving,

      onViewOrder,
      onShowSuccPopup,
      onShowErrorPopup,
      onSave,
    };
  },
});
</script>


<template>
  <LoadingComp v-if="loading" />
  <div v-else>
    <div class="book-name">
      {{ model.bookName }}
    </div>
    <div class="content-wrap">
      <FormComp
        v-model="model"
        :saving="saving"
        @on-save="onSave"
      />
    </div>
    <PopupSuccPage
      v-model="succPopup.shown"
      :address="succPopup.address"
      @on-view-order="onViewOrder"
    />
    <PopupErrorPage
      v-model="errorPopup.shown"
      :error-msg="errorPopup.errorMsg"
      @on-view-order="onViewOrder"
    />
  </div>
</template>

<style lang="less" scoped>
:deep(.sh-popup-result-page) {
  top: 0;
  max-width: unset;
  transform: none;
}

:deep(.page-wrap) {
  width: 100vw;
  height: 100vh;
  padding-top: 30%;

  .result-wrap {
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 2.7rem;
    margin: 0 auto;
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

      .red {
        color: var(--red-color);
      }
    }
  }
}

.book-name {
  height: 1.04rem;
  padding: 0.16rem 0.12rem 0.4rem;
  background: linear-gradient(311deg, #4060D0 -3.29%, #4D6EF6 51.72%, #4162D3 104.58%);
  color: #fff;
  font-weight: 600;
  font-size: 0.16rem;
}

.content-wrap {
  min-height: calc(100vh - 0.8rem);
  margin-top: -0.24rem;
  padding: 0.2rem;
  overflow: auto;
  background-color: #fff;
  border-radius: 0.24rem 0.24rem 0 0;
}
</style>
