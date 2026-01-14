<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue';
import SimpleSeamlessScrolling from 'simple-seamless-scrolling';

import { push, goOutSideUrl } from '@/helps/navigation';
import { RouterName as RN } from '@/config/router';
import { OutsideUrl } from '@/config/outside-url';
import { openToastError } from '@/helps/toast';


export default defineComponent({
  components: {
    SimpleSeamlessScrolling,
  },

  setup() {
    const vm = getCurrentInstance();

    const noticeList = ref([]);

    function onClickNoticeBlock() {
      push(vm.proxy.$router, {
        name: RN.NewsCenter,
      });
    }

    function onClickNoticeBlockItem({ id }) {
      const url = `${OutsideUrl.officalWeb}/article/view/id-${id}.html`;
      goOutSideUrl({ url });
    }

    function onLoadData() {
      try {
        // TODO:获取消息
        noticeList.value = [
          {
            text: '“儿童英文阅力计划”之英文绘本演绎音视频征集获奖名单公告。',
            id: 37558,
          },
        ];
      } catch (error) {
        openToastError(error.message);
        throw error;
      }
    }

    onMounted(() => {
      onLoadData();
    });

    return {
      noticeList,

      onClickNoticeBlock,
      onClickNoticeBlockItem,
    };
  },
});
</script>


<template>
  <div
    class="notice-wrapper"
  >
    <div class="spirte spirte-notice" />
    <div
      class="notice-text-wrapper"
    >
      <SimpleSeamlessScrolling
        :list="noticeList"
      >
        <div
          v-for="item in noticeList"
          :key="item.id"
          class="notice-text"
          @click="onClickNoticeBlockItem(item)"
        >
          {{ item.text }}
        </div>
      </SimpleSeamlessScrolling>
    </div>
    <div
      class="more"
      @click="onClickNoticeBlock"
    >
      <span>
        {{ $t('home.more') }}
      </span>
      <div class="spirte spirte-more-notice-arrow" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.notice-wrapper {
  display: flex;
  align-items: center;
  padding: 0.13rem 0;
  border-top: 0.005rem solid #eaeaea;

  .notice-text-wrapper {
    position: relative;
    flex: 1;
    max-width: calc(100% - 0.66rem);
    padding: 0 0.12rem;

    .notice-text {
      font-size: 0.12rem;
      white-space: nowrap;
    }

    &::before,
    &::after {
      position: absolute;
      top: 0;
      display: inline-block;
      width: 0.42rem;
      height: 100%;
      content: "";
    }

    &::before {
      left: -0.21rem;
      background: linear-gradient(to right, #fff 66.67%, rgba(255, 255, 255, 0) 103.58%);
    }

    &::after {
      right: -0.21rem;
      background: linear-gradient(to left, #fff 66.67%, rgba(255, 255, 255, 0) 103.58%);
    }
  }

  .spirte-notice-close {
    cursor: pointer;
  }
}

.more {
  display: flex;
  align-items: center;
  color: #6B778c;
  font-weight: 400;
  font-size: 0.12rem;
  cursor: pointer;
}

.more,
.spirte-notice {
  position: relative;
  z-index: 2;
}
</style>
