<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Button } from 'vant';

import { namespaceT } from '@/helps/namespace-t';
import { openToastError, openToastSuccess } from '@/helps/toast';

import { getStatusTxt, getItemTheme, Status } from '../helps/data';

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
        openToastSuccess(t('hint.cancelSuccess'));
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

      Status,

      getStatusTxt,
      getItemTheme,

      onClickCancel,
    };
  },
});
</script>


<template>
  <div
    class="list-item"
    :class="getItemTheme(content.status)"
  >
    <div class="list-meta">
      <div class="cover">
        <img
          :src="content.cover"
          alt=""
        >
      </div>

      <div class="meta">
        <div class="type-status">
          <div class="type">
            {{ content.type }}
          </div>

          <div class="status">
            {{ getStatusTxt(content.status) }}
          </div>
        </div>
        <div class="title">
          {{ content.title }}
        </div>
        <div class="item">
          {{ t('label.address') }}
          {{ content.address }}
        </div>
        <div class="item">
          {{ t('label.updateTime') }}
          {{ content.updateTime }}
        </div>
      </div>
    </div>

    <div class="actions">
      <div class="fetch-time">
        <template v-if="content.latestFetchTime">
          {{ t('label.latestFetchTime') }}
          {{ content.latestFetchTime }}
        </template>
      </div>

      <VButton
        v-if="content.status === Status.READYING"
        type="default"
        class="vant-primary-btn default-btn"
        :loading="saving"
        @click="onClickCancel"
      >
        {{ t('btn.cancel') }}
      </VButton>

      <VButton
        v-if="content.status === Status.TIME_OUT"
        type="default"
        disabled
        class="vant-primary-btn default-btn"
      >
        {{ t('btn.timeout') }}
      </VButton>

      <VButton
        v-if="content.status === Status.READER_CANCEL"
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
  display: flex;
  align-items: flex-start;
  padding: 0.12rem 0.09rem 0.12rem 0.12rem;

  .cover {
    width: 0.65rem;
    margin-right: 0.14rem;

    img {
      width: 100%;
      object-fit: cover;
    }
  }

  .meta {
    flex: 1;
    font-weight: 400;
    font-size: 0.12rem;
    line-height: 1.45;

    .type-status {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.03rem;

      .type {
        flex: 1;
        color: #777;
      }

      .status {
        height: 0.2rem;
        padding: 0 0.07rem;
        color: var(--primary-color);
        font-size: 0.11rem;
        line-height: 0.2rem;
        background-color: #f7f8ff;
        border-radius: 0.1rem;
      }
    }

    .title {
      margin-bottom: 0.07rem;
      color: #222;
      font-weight: 700;
      font-size: 0.16rem;
    }

    .item {
      margin-bottom: 0.04rem;
      color: #777;
    }
  }
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 0.5rem;
  padding: 0 0.12rem;
  border-top: 0.005rem solid fade(#000, 7);

  .fetch-time {
    color: #777;
    font-weight: 400;
    font-size: 0.12rem;
    line-height: 1.45;
  }
}

.list-item.cancel {
  .list-meta .meta {
    .type-status {
      .status {
        color: var(--red-color);
        background-color: #fef8f8;
      }

      .type {
        color: #bababa;
      }
    }

    .title,
    .item {
      color: #bababa;
    }
  }

  .actions .fetch-time {
    color: #bababa;
  }
}
</style>
