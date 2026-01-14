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

    return {
      t,

      onClickPreLoan,
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
      <div>
        <div class="title">
          {{ content.title }}
        </div>
        <div class="item">
          {{ content.author }}
        </div>
      </div>
      <div class="actions">
        <VButton
          type="default"
          class="vant-primary-btn default-btn"
          @click.stop="onClickPreLoan"
        >
          {{ t('action.preLoan') }}
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
      margin-top: 0.05rem;
    }
  }
}
</style>
