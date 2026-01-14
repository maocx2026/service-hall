<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from 'vue';
import { Button } from 'vant';

import { RouterName as RN } from '@/config/router';
import { push } from '@/helps/navigation';
import { namespaceT } from '@/helps/namespace-t';


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

      onBookPreLoan,
      onAddBookCart,
    };
  },
});
</script>

<template>
  <div class="actions">
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
  }
}
</style>
