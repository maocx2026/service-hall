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
    const t = namespaceT('newBookCart.list');

    function onClickPreLoan() {
      push(vm.proxy.$router, {
        name: RN.BookAdvanceBorrowAdd,
      });
    }

    function onAddExpressBookCart() {
      push(vm.proxy.$router, {
        name: RN.AddExpressBookCart,
      });
    }

    function onClickDetail() {
      push(vm.proxy.$router, {
        name: RN.NewBookCarDetail,
        params: {
          id: props.content.recordno,
        },
      });
    }

    return {
      t,

      onClickPreLoan,
      onAddExpressBookCart,
      onClickDetail,
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
      <div class="title">
        {{ content.title }}
      </div>
      <div class="item">
        {{ content.author }} / {{ content.publisher }}
      </div>
      <div class="item">
        {{ t('label.price') }}
        {{ content.price }}
      </div>
      <div class="leftnum-and-action">
        {{ t('label.leftNum', { num: content.leftNum }) }}
        <div class="actions">
          <VButton
            v-if="content.preloan"
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

    .leftnum-and-action {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.05rem;
      color: var(--red-color);
      font-weight: 300;
      font-size: 0.11rem;

      .actions {
        display: flex;
        align-items: center;
        gap: 0.08rem;
      }
    }
  }
}
</style>
