<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from 'vue';

import InputSearch from './input-search.vue';
import QuickLinkItem from './quick-link-item.vue';

import { topQuickLinkData } from '../helps/data';
import { getWelcomeTextBaseOnTime } from '../helps/get-welcome-text';


export default defineComponent({
  components: {
    InputSearch,
    QuickLinkItem,
  },

  setup() {
    const vm = getCurrentInstance();
    const username = ref('Job');

    function onClickUsername() {
      vm.proxy.$eventBus.emit('on-click-qrcode');
    }

    return {
      username,
      quickLinkData: topQuickLinkData(),

      getWelcomeTextBaseOnTime,
      onClickUsername,
    };
  },
});
</script>

<template>
  <div class="top-search-wrapper">
    <div class="top-part">
      <InputSearch />

      <div class="quick-link">
        <QuickLinkItem
          v-for="item in quickLinkData"
          :key="item.key"
          :content="item"
        />
      </div>
    </div>

    <div
      class="username-part"
      @click="onClickUsername"
    >
      <div class="welcome-txt">
        {{ getWelcomeTextBaseOnTime() }}
        {{ username }}
      </div>

      <div class="spirte spirte-username-arrow" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.top-search-wrapper {
  position: relative;
  min-height: 1.24rem;
  padding: 0.16rem 0.12rem;
  background: url("@/assets/img/home-title-bg.png") no-repeat;
  background-size: 100% auto;
  border-bottom-right-radius: 0.28rem;
  border-bottom-left-radius: 0.28rem;
}

.top-part {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .quick-link {
    display: flex;
    align-items: center;
    gap: 0.08rem;
  }
}

.username-part {
  position: absolute;
  bottom: -0.24rem;
  left: 0.12rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1.78rem;
  height: 0.46rem;
  padding-right: 0.07rem;
  padding-left: 0.16rem;
  color: #fff;
  font-size: 0.16rem;
  font-weight: 400;
  border-radius: 0.23rem;
  background-color: #5a7aea;
  cursor: pointer;
}
</style>
