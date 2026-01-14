<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';

import { createTopAnchorLinkData } from '../helps/data';

export default defineComponent({
  props: {
  },

  setup() {
    const anchorList = createTopAnchorLinkData();
    const activeKey = ref('readBook');

    const isLock = ref(false);
    let timer;

    function onSelectAnchor({ idName, key }) {
      isLock.value = true;
      if (timer) {
        clearTimeout(timer);
      }
      activeKey.value = key;
      const typeItemDom = document.getElementById(idName);
      const scrollElement = document.getElementById('mobile-read-content');
      scrollElement.scrollTo({
        top: typeItemDom.offsetTop - 80,
        behavior: 'smooth',
      });


      timer = setTimeout(() => {
        // 关锁
        isLock.value = false;
      }, 1500);
    }

    // 监听页面滚动
    const handleScroll = () => {
      if (!isLock.value) {
        anchorList
          .forEach((item) => {
            const shopItemDom = document.getElementById(item.idName);

            // 每个模块距离顶部的距离
            const offsetTop = shopItemDom.offsetTop - 80;
            const scrollElement = document.getElementById('mobile-read-content');

            // 页面滚动的距离
            const { scrollTop } = scrollElement;

            if (scrollTop >= offsetTop) {
              // 给左边分类设置激活的效果
              activeKey.value = item.key;
            }
          });
      }
    };

    onMounted(() => {
      const element = document.getElementById('mobile-read-content');
      element.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      const element = document.getElementById('mobile-read-content');

      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
    });

    return {
      anchorList,
      activeKey,

      onSelectAnchor,
    };
  },
});
</script>

<template>
  <div class="anchor-list-wrap">
    <div
      v-for="item in anchorList"
      :key="item.key"
      class="anchor-item"
      :class="{'active': item.key === activeKey}"
      @click="onSelectAnchor(item)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.anchor-list-wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 1.5rem;
  padding-top: 0.16rem;
  padding-bottom: 0.94rem;
  color: #fff;
  background: linear-gradient(311deg, #4060d0 -3.29%, #4d6ef6 51.72%, #4162d3 104.58%);

  .anchor-item {
    position: relative;
    padding-bottom: 0.05rem;
    font-weight: 400;
    font-size: 0.16rem;
    line-height: 1.4;
    transition: all 0.2s ease-in;
    cursor: pointer;

    &.active {
      font-weight: 600;
      font-size: 0.18rem;

      &::after {
        position: absolute;
        left: 50%;
        bottom: 0;
        display: inline-block;
        width: 0.16rem;
        height: 0.03rem;
        border-radius: 0.03rem;
        background-color: #fff;
        transform: translateX(-50%);
        content: "";
      }
    }
  }
}
</style>
