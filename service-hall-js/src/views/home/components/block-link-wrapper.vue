<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';

import { onClickLink } from '@/helps/navigation';

import LinkItem from './link-item.vue';

export default defineComponent({
  components: {
    LinkItem,
  },

  props: {
    title: {
      type: String,
      default: '',
    },

    data: {
      type: Array,
      default: () => [],
    },
  },

  setup() {
    const vm = getCurrentInstance();

    function onClickQuickLinkItem(item) {
      onClickLink(vm.proxy.$router, item);
    }

    return {
      onClickQuickLinkItem,
    };
  },
});
</script>


<template>
  <div class="block-link-wrapper">
    <div class="title">
      {{ title }}
    </div>

    <div class="link-block">
      <LinkItem
        v-for="item in data"
        :key="item.key"
        :content="item"
        @click="onClickQuickLinkItem(item)"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.block-link-wrapper {
  margin-top: 0.2rem;
  padding: 0 0.12rem;
}

.title {
  margin-bottom: 0.06rem;
  color: #212121;
  font-size: 0.16rem;
  font-weight: 500;
  line-height: 1.5;
}

.link-block {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 0.16rem;
  background-color: #fff;
  border-radius: 0.08rem;
}
</style>
