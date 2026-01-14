<script lang="ts">
import { defineComponent } from 'vue';
import { Popup, Button } from 'vant';


export default defineComponent({
  components: {
    VPopup: Popup,
    VButton: Button,
  },

  props: {
    title: {
      type: String,
      default: '',
    },
    showAction: {
      type: Boolean,
      default: true,
    },
    noPadding: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'on-confirm',
    'on-reset',
  ],

  setup(props, { emit }) {
    function onClickConfirm() {
      emit('on-confirm');
    }

    function onClickReset() {
      emit('on-reset');
    }

    return {
      onClickConfirm,
      onClickReset,
    };
  },
});
</script>

<template>
  <VPopup
    position="bottom"
    closeable
    class="sh-vant-popup-bottom filter-popup"
    :class="{'no-footer': !showAction}"
    :close-on-click-overlay="false"
    v-bind="$attrs"
  >
    <div class="header-bar">
      {{ title }}
    </div>

    <div
      class="content"
      :class="{'no-footer': !showAction, 'no-padding': noPadding}"
    >
      <slot />
    </div>

    <div
      v-if="showAction"
      class="action-block"
    >
      <VButton
        block
        type="default"
        class="vant-default-btn"
        @click="onClickReset"
      >
        {{ $t('common.action.reset') }}
      </VButton>

      <VButton
        block
        type="primary"
        class="vant-primary-btn"
        @click="onClickConfirm"
      >
        {{ $t('common.action.confirm') }}
      </VButton>
    </div>
  </VPopup>
</template>

<style lang="less" scoped>
.filter-popup {
  max-height: 90%;
  padding-bottom: 0.82rem;

  &.no-footer {
    padding-bottom: 0;
  }

  .header-bar {
    height: 0.6rem;
    border-bottom: 0.005rem solid fade(#000, 10);
    // padding-right: 0.45rem;
    color: #777;
    font-weight: 300;
    font-size: 0.16rem;
    line-height: 0.6rem;
    text-align: center;
  }

  .content {
    max-height: calc(90vh - 0.6rem - 0.82rem);
    padding: 0.12rem;
    overflow: auto;

    &.no-footer {
      max-height: calc(90vh - 0.6rem);
    }

    &.no-padding {
      padding: 0;
    }
  }
}
</style>
