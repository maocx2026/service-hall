<script lang="ts">
import { defineComponent, getCurrentInstance, ref, onMounted } from 'vue';
import { Search, showLoadingToast } from 'vant';

import { getWxConfigUrl } from '@/helps/wx';
import { getAccessToken } from '@/helps/get-access-token';
import { namespaceT } from '@/helps/namespace-t';
import { openToastError } from '@/helps/toast';
import { RouterName as RN } from '@/config/router';
import { push } from '@/helps/navigation';
import { sleep } from '@/utils/sleep';

import { WechatApi } from '@/api/wechat-api';

export default defineComponent({
  components: {
    VSearch: Search,
  },

  setup() {
    const vm = getCurrentInstance();
    const wx = vm.proxy.$jWeixin;
    const t = namespaceT();
    const isWx = ref(false);
    const keyword = ref('');

    async function loadWechat() {
      await sleep(100);

      const toast = showLoadingToast({
        message: t('common.hint.loading'),
        forbidClick: true,
      });

      try {
        const api = new WechatApi();
        api.params = {
          url: getWxConfigUrl(),
          accesstoken: getAccessToken(),
        };
        const ress = await api.send();
        const res = {
          ...ress.record[0],
        };
        toast.close();

        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.appid, // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: res.signature, // 必填，签名
          jsApiList: ['scanQRCode'], // 必填，需要使用的JS接口列表
        });

        wx.ready(() => {
          isWx.value = true;
          wx.checkJsApi({
            jsApiList: ['scanQRCode'],
            success: (checkRes) => {
              console.log('@@checkRes:', checkRes);
            },
          });
        });
        // 处理失败后回调
        wx.error((err) => {
          console.log('@@微信接口处理失败:', err);
        });
      } catch (e) {
        toast.close();
        openToastError(e.message);
      }
    }

    function onClickScan() {
      // TODO:扫一扫
      console.log('TODO:扫一扫');
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: (res) => {
          const result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          console.log('result', result);
        },
      });
    }

    function onSearch(searchKeyword) {
      push(vm.proxy.$router, {
        name: RN.SearchResult,
        query: {
          v_value: searchKeyword,
        },
      });
    }

    onMounted(() => {
      // TODO:需解开注释，获取微信签名信息
      // loadWechat();
    });

    return {
      isWx,
      keyword,

      onClickScan,
      onSearch,
      loadWechat,
    };
  },
});
</script>

<template>
  <VSearch
    v-model="keyword"
    :placeholder="$t('home.searchPlace')"
    class="search-input"
    @search="onSearch"
  >
    <template #left-icon>
      <div class="spirte spirte-search" />
    </template>
    <template #right-icon>
      <div
        class="spirte spirte-scan"
        @click="onClickScan"
      />
    </template>
  </VSearch>
</template>

<style lang="less" scoped>
.search-input {
  min-width: 1.56rem;
  max-width: 2rem;
  height: 0.36rem;
  padding: 0.1rem 0;
  border-radius: 0.18rem;
  background-color: fade(#fff, 70);
  backdrop-filter: blur(2px);
  overflow: hidden;

  :deep(.van-search__content) {
    padding-left: 0.09rem;
    background: transparent;
  }

  :deep(.van-field__right-icon) {
    padding-right: 0.09rem;
  }

  :deep(.van-field__control) {
    &::placeholder {
      color: #878787;
      font-size: 0.12rem;
      line-height: 0.36rem;
    }
  }
}
</style>
