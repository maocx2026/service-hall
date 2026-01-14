<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { Button } from 'vant';

import { namespaceT } from '@/helps/namespace-t';
import { openToastError, openToastSuccess } from '@/helps/toast';

export default defineComponent({
  components: {
    VButton: Button,
  },

  props: {
    content: {
      type: Object,
      default: () => {},
    },

    idx: {
      type: Number,
      default: 1,
    },
  },

  emits: [
    'reload',
  ],

  setup(props, { emit }) {
    const t = namespaceT('myBorrow');
    const isExpend = ref(false);
    const renewaling = ref(false);
    const transnewaling = ref(false);

    const formatIdx = computed(() => {
      return String(props.idx + 1).padStart(2, '0');
    });

    function onToggleExpend() {
      isExpend.value = !isExpend.value;
    }

    function onClickRenewal() {
      try {
        renewaling.value = true;
        // TODO:续借
        console.log('TODO:续借');
        openToastSuccess(t('hint.renewSucc'));
        emit('reload');
      } catch (error) {
        openToastError(error.message);
        throw error;
      } finally {
        renewaling.value = false;
      }
    }

    function onClickTransnewal() {
      try {
        transnewaling.value = true;
        // TODO:转借
        console.log('TODO:转借');
        openToastSuccess(t('hint.transnewalSucc'));
        emit('reload');
      } catch (error) {
        openToastError(error.message);
        throw error;
      } finally {
        transnewaling.value = false;
      }
    }

    return {
      t,
      formatIdx,
      isExpend,
      renewaling,
      transnewaling,

      onToggleExpend,
      onClickRenewal,
      onClickTransnewal,
    };
  },
});
</script>


<template>
  <div class="list-item">
    <div class="my-borrow-info">
      <div class="cover">
        <img
          :src="content.cover"
          alt=""
        >
      </div>
      <div class="meta">
        <div class="title">
          {{ formatIdx }} {{ content.title }}
        </div>

        <div
          class="meta-item"
          :class="{'shrink': !isExpend}"
        >
          {{ t('label.isbn') }}{{ content.isbn }}
        </div>
        <div
          class="meta-item"
          :class="{'shrink': !isExpend}"
        >
          {{ t('label.fetchNo') }}{{ content.fetchNo }}
        </div>
        <div
          class="meta-item"
          :class="{'shrink': !isExpend}"
        >
          {{ t('label.barcode') }}{{ content.barcode }}
        </div>
        <div class="meta-item">
          {{ t('label.borrowTime') }}{{ content.borrowTime }}
        </div>
        <div class="meta-item">
          {{ t('label.leftDays') }}
          <span class="red">
            {{ content.leftDays }}{{ t('label.dayUnit') }}
          </span>
        </div>

        <div class="btns">
          <VButton
            type="default"
            class="vant-primary-btn default-btn"
            :disabled="!content.canRenewal"
            @click="onClickRenewal"
          >
            {{ content.canRenewal ? t('btn.renewal') : t('btn.cannotRenewal') }}
          </VButton>
          <VButton
            type="default"
            class="vant-primary-btn default-btn"
            :loading="transnewaling"
            @click="onClickTransnewal"
          >
            {{ t('btn.transnewal') }}
          </VButton>
        </div>
      </div>
    </div>

    <div
      class="expend-shrink-btn"
      :class="{'expend': isExpend}"
      @click="onToggleExpend"
    >
      {{ isExpend ? t('btn.shrink') : t('btn.expend') }}
      <div class="spirte spirte-bottom-triangle-gray1" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.my-borrow-info {
  display: flex;
  gap: 0.14rem;
  padding: 0.12rem;

  .meta {
    flex: 1;
    line-height: 1.4;

    .title {
      margin-bottom: 0.06rem;
      color: #222;
      font-weight: 700;
      font-size: 0.16rem;
    }

    .meta-item {
      margin-bottom: 0.02rem;
      overflow: hidden;
      color: #777;
      font-weight: 400;
      font-size: 0.12rem;
      transition: all 0.2s linear;

      &.shrink {
        height: 0;
        margin-bottom: 0;
      }

      .red {
        color: var(--red-color);
      }
    }
  }

  .cover {
    width: 0.72rem;

    img {
      width: 100%;
      object-fit: cover;
    }
  }
}

.btns {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.08rem;
  margin-top: 0.04rem;
}
</style>
