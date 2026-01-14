<script lang="ts">
import { defineComponent } from 'vue';

import { namespaceT } from '@/helps/namespace-t';

export default defineComponent({
  emits: [
    'on-apply',
  ],

  setup(props, { emit }) {
    const t = namespaceT('applyVirtualltCard');

    function onClickLogin() {
      console.log('TODO:去登陆');
    }

    function onClickApply() {
      emit('on-apply');
    }

    return {
      t,
      onClickLogin,
      onClickApply,
    };
  },
});
</script>

<template>
  <div class="info-box">
    <div class="info-item">
      {{ t('entryInfo1[0]') }}
      <a
        href="#"
        class="link"
        @click.stop.prevent="onClickLogin"
      >
        {{ t('entryInfo1[1]') }}
      </a>
    </div>
    <div class="info-item">
      {{ t('entryInfo2[0]') }}
      <a
        href="#"
        class="link"
        @click.stop.prevent="onClickApply"
      >
        {{ t('entryInfo2[1]') }}
      </a>
    </div>
    <div class="info-item">
      {{ t('entryInfo3[0]') }}
      <a
        href="#"
        class="link"
        @click.stop.prevent="onClickApply"
      >
        {{ t('entryInfo3[1]') }}
      </a>
      {{ t('entryInfo3[2]') }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.info-box {
  padding: 0 0.4rem;
  color: #fff;
  font-weight: 400;
  font-size: 0.14rem;
  line-height: 1.85;

  .info-item {
    margin-bottom: 0.3rem;

    .link {
      color: #f5aa52;
      font-size: 0.18rem;
    }
  }
}
</style>
