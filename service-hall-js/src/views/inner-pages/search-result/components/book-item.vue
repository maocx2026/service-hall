<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';
import { Button } from 'vant';

import { namespaceT } from '@/helps/namespace-t';
import { push } from '@/helps/navigation';
import { RouterName as RN } from '@/config/router';

export default defineComponent({
  components: {
    VButton: Button,
  },

  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {
    const vm = getCurrentInstance();
    const t = namespaceT('bookAdvanceBorrow.list');

    function onClickPreLoan() {
      push(vm.proxy.$router, {
        name: RN.BookAdvanceBorrowAdd,
      });
    }

    function onClickDetail() {
      push(vm.proxy.$router, {
        name: RN.SzlibBookListDetail,
        params: {
          id: props.content.recordno,
        },
      });
    }

    function onAddExpressBookCart() {
      push(vm.proxy.$router, {
        name: RN.AddExpressBookCart,
      });
    }

    function onClickFastLoan() {
      push(vm.proxy.$router, {
        name: RN.FastLoan,
      });
    }

    return {
      t,

      onClickPreLoan,
      onClickDetail,
      onAddExpressBookCart,
      onClickFastLoan,
    };
  },
});
</script>


<template>
  <div
    class="list-item"
    @click="onClickDetail"
  >
    <div class="cover">
      <img
        :src="content.cover"
        alt=""
      >
    </div>

    <div class="meta">
      <div>
        <div class="title">
          {{ content.title }}
        </div>
        <div class="item">
          {{ content.author }} / {{ content.publisher }}
        </div>
      </div>
      <div class="actions">
        <VButton
          type="default"
          class="vant-primary-btn default-btn"
          @click.stop="onClickFastLoan"
        >
          {{ t('action.fastLoan') }}
        </VButton>
        <VButton
          type="default"
          class="vant-primary-btn default-btn"
          @click.stop="onClickPreLoan"
        >
          {{ t('action.preLoan') }}
        </VButton>
        <VButton
          type="default"
          class="vant-primary-btn default-btn icon-btn"
          @click.stop="onAddExpressBookCart"
        >
          <template #icon>
            <div class="spirte spirte-shop-cart-blue" />
          </template>
        </VButton>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.list-item {
  display: flex;
  padding: 0.12rem;

  .cover {
    width: 0.72rem;
    margin-right: 0.14rem;

    img {
      width: 100%;
      object-fit: cover;
    }
  }

  .meta {
    flex: 1;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    line-height: 1.45;

    .title {
      margin-bottom: 0.05rem;
      color: #222;
      font-weight: 700;
      font-size: 0.16rem;
    }

    .item {
      margin-bottom: 0.04rem;
      color: #777;
      font-weight: 400;
      font-size: 0.12rem;
    }

    .actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.08rem;
      margin-top: 0.05rem;
    }
  }
}
</style>
