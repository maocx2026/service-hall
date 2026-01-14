<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';

import { onClickLink } from '@/helps/navigation';

export default defineComponent({
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {
    const vm = getCurrentInstance();

    function onClickReadLink() {
      onClickLink(vm.proxy.$router, props.content);
    }

    return {
      onClickReadLink,
    };
  },
});
</script>

<template>
  <div
    class="link-item"
    @click="onClickReadLink"
  >
    <div class="title">
      {{ content.title }}
      <div
        v-if="content.isEn"
        class="tag en"
      >
        {{ $t('mobileRead.en') }}
      </div>
      <div
        v-if="content.isChild"
        class="tag child"
      >
        {{ $t('mobileRead.child') }}
      </div>
      <div
        v-if="content.isTry"
        class="tag try"
      >
        {{ $t('mobileRead.try') }}
      </div>
    </div>

    <div class="spirte spirte-mobile-read-link" />
  </div>
</template>

<style lang="less" scoped>
.link-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 0.5rem;
  margin-bottom: 0.06rem;
  padding: 0 0.16rem 0 0.14rem;
  border-radius: 0.08rem;
  background-color: #fff;
  cursor: pointer;
}

.title {
  display: flex;
  align-items: center;
  gap: 0.04rem;
  color: #444;
  font-weight: 400;
  font-size: 0.15rem;

  .tag {
    height: 0.17rem;
    padding: 0 0.04rem;
    font-weight: 400;
    font-size: 0.09rem;
    border-radius: 0.2rem;
    border: 0.005rem solid #000;
    line-height: 0.17rem;

    &.en {
      color: var(--primary-color);
      border-color: var(--primary-color);
    }

    &.child {
      color: #fd7018;
      border-color: #fd7018;
    }

    &.try {
      color: #777;
      border-color: #777;
    }
  }
}
</style>
