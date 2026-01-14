<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Button } from 'vant';

import { namespaceT } from '@/helps/namespace-t';
import { openToastError } from '@/helps/toast';

import { getExpressStatusTxt, getExpressItemTheme, ExpressStatus } from '../helps/data';


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

  emits: [
    'reload',
  ],

  setup(props, { emit }) {
    const t = namespaceT('myAdvanceBorrowLoad');
    const saving = ref(false);

    function onClickCancel() {
      try {
        saving.value = true;
        // TODO:取消的逻辑
        console.log('TODO:取消的逻辑');
        emit('reload');
      } catch (error) {
        openToastError(error.message);
        throw error;
      } finally {
        saving.value = false;
      }
    }

    return {
      t,
      saving,

      ExpressStatus,

      getExpressStatusTxt,
      getExpressItemTheme,

      onClickCancel,
    };
  },
});
</script>


<template>
  <div
    class="list-item"
    :class="getExpressItemTheme(content.status)"
  >
    <div class="list-meta">
      <div class="orderno">
        {{ t('label.orderno') }}
        {{ content.orderNo }}
      </div>
      <div class="order-time">
        {{ t('label.orderTime') }}
        {{ content.orderTime }}
      </div>

      <div class="status">
        {{ getExpressStatusTxt(content.status) }}
      </div>
    </div>

    <div class="book-list">
      <div
        v-for="item in content.books"
        :key="`img${item.id}`"
        class="cover-box"
      >
        <img
          :src="item.cover"
          alt=""
        >
      </div>
    </div>

    <div class="actions">
      <div class="express-fee">
        {{ t('expressFee', { num: content.total }) }}
        <span class="fee">
          ￥6
        </span>
      </div>
      <VButton
        v-if="content.status === ExpressStatus.PENDING"
        type="default"
        class="vant-primary-btn default-btn"
        :loading="saving"
        @click="onClickCancel"
      >
        {{ t('btn.cancelOrder') }}
      </VButton>

      <VButton
        v-if="content.status === ExpressStatus.READER_CANCEL"
        type="default"
        disabled
        class="vant-primary-btn default-btn"
      >
        {{ t('btn.canceled') }}
      </VButton>
    </div>
  </div>
</template>

<style lang="less" scoped>
.list-item {
  margin-bottom: 0.08rem;
  background-color: #fff;
  border-radius: 0.08rem;
}

.list-meta {
  position: relative;
  padding: 0.12rem 0.12rem 0.1rem;

  .orderno {
    margin-bottom: 0.02rem;
    color: #444;
    font-weight: 600;
    font-size: 0.15rem;
  }

  .order-time {
    color: #777;
    font-weight: 600;
    font-size: 0.12rem;
  }

  .status {
    position: absolute;
    top: 0.09rem;
    right: 0.09rem;
    height: 0.2rem;
    padding-left: 0.05rem;
    padding-right: 0.07rem;
    color: var(--primary-color);
    font-weight: 600;
    font-size: 0.11rem;
    line-height: 0.2rem;
    border-radius: 0.1rem;
    background-color: #f7f8ff;
    letter-spacing: 0.0022rem;
  }
}

.book-list {
  display: flex;
  align-items: center;
  gap: 0.04rem;
  border-top: 0.005rem solid fade(#000, 7);
  padding: 0.1rem 0.12rem;

  .cover-box {
    width: 0.7rem;
    padding: 0.05rem 0.14rem;
    background-color: #f7f8ff;
    border-radius: 0.03rem;

    img {
      width: 100%;
      object-fit: cover;
    }
  }
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 0.5rem;
  padding: 0 0.12rem;
  color: #777;
  font-weight: 400;
  font-size: 0.12rem;
  border-top: 0.005rem solid fade(#000, 7);

  .fee {
    color: #444;
    font-weight: 500;
    font-size: 0.15rem;
  }
}

.list-item.cancel {
  .list-meta {
    .orderno,
    .order-time {
      color: #bababa;
    }

    .status {
      color: var(--red-color);
      background-color: #fef8f8;
    }
  }

  .actions {
    color: #bababa;

    .fee {
      color: #bababa;
    }
  }
}
</style>
