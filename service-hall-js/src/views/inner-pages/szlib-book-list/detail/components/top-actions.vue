<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from 'vue';
import { Button } from 'vant';

import { RouterName as RN } from '@/config/router';
import { push } from '@/helps/navigation';
import { namespaceT } from '@/helps/namespace-t';
import { openToastError } from '@/helps/toast';
import { openCollectionDialog } from '@/helps/dialog';

export default defineComponent({
  components: {
    VButton: Button,
  },

  props: {
    modelValue: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {
    const vm = getCurrentInstance();
    const t = namespaceT('szlibBookList.detail');
    const model = ref(props.modelValue);

    function onViewLibCollection() {
      push(vm.proxy.$router, {
        name: RN.ViewLibCoolection,
        query: {
          v_recno: model.value.v_recno,
          v_curtable: model.value.v_curtable,
        },
      });
    }

    function onAddCollection() {
      try {
        // TODO:加入收藏逻辑
        Object.assign(model.value, {
          isCollected: true,
        });
        openCollectionDialog(t('hint.collectSucc'));
      } catch (error) {
        openToastError(error.message);
        throw error;
      }
    }

    function onCancelCollection() {
      try {
        // TODO:取消收藏逻辑
        Object.assign(model.value, {
          isCollected: false,
        });
        openCollectionDialog(t('hint.cancelCollectSucc'));
      } catch (error) {
        openToastError(error.message);
        throw error;
      }
    }

    function onBookPreLoan() {
      push(vm.proxy.$router, {
        name: RN.BookAdvanceBorrowAdd,
      });
    }

    function onAddBookCart() {
      push(vm.proxy.$router, {
        name: RN.AddExpressBookCart,
      });
    }

    return {
      t,
      model,


      onViewLibCollection,
      onAddCollection,
      onCancelCollection,
      onBookPreLoan,
      onAddBookCart,
    };
  },
});
</script>

<template>
  <div class="actions">
    <VButton
      block
      type="primary"
      class="vant-primary-btn"
      @click="onViewLibCollection"
    >
      {{ t('action.viewLibCollection') }}
    </VButton>
    <VButton
      v-if="model.isCollected"
      block
      type="primary"
      class="vant-primary-btn"
      @click="onCancelCollection"
    >
      {{ t('action.cancelCollect') }}
    </VButton>
    <VButton
      v-else
      block
      type="primary"
      class="vant-primary-btn"
      @click="onAddCollection"
    >
      {{ t('action.addCollect') }}
    </VButton>
    <VButton
      v-if="model.canPreLoan"
      block
      type="primary"
      class="vant-primary-btn"
      @click="onBookPreLoan"
    >
      {{ t('action.preLoan') }}
    </VButton>
    <VButton
      v-if="model.canAddCart"
      block
      type="primary"
      class="vant-primary-btn"
      @click="onAddBookCart"
    >
      {{ t('action.addBookCart') }}
    </VButton>
  </div>
</template>

<style lang="less" scoped>
.actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.1rem;
  margin-top: 0.16rem;

  > .vant-primary-btn {
    flex: 1;
    height: 0.4rem;
    font-size: 0.14rem;
    background-color: fade(#fff, 10);
    border: 0;

    &:nth-last-child(4):first-child,
    &:nth-last-child(4):first-child ~ * {
      width: calc(100% / 2 - 0.1rem);
      flex: none;
    }
  }
}
</style>
