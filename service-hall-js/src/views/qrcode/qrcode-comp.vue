<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';

import { namespaceT } from '@/helps/namespace-t';

export default defineComponent({
  setup() {
    const vm = getCurrentInstance();
    const t = namespaceT('mine');

    function onClickOverlay() {
      vm.proxy.$eventBus.emit('on-close-qrcode');
    }

    return {
      t,

      onClickOverlay,
    };
  },
});
</script>

<template>
  <div class="qrcode-page">
    <div
      class="overlay"
      @click="onClickOverlay"
    />
    <div class="qrcode-cont-wrap">
      <div class="logo">
        <img
          src="@/assets/img/qrcode-logo.png"
          alt=""
        >
      </div>

      <div class="qrcode-wrap">
        <div class="qrcode-title">
          <span class="en">{{ t('readCardEn') }}</span>
          <span>{{ t('readCardZh') }}</span>
        </div>
        <div class="qrcode">
          <img
            src="@/assets/img/qrcode.png"
            alt=""
          >
        </div>

        <div class="read-card-wrap">
          <div class="read-card">
            {{ t('readCardNo') }}

            <span class="cardno">
              0440002763139
            </span>
          </div>
        </div>
      </div>

      <div class="type-valid-time">
        <div class="item">
          {{ t('cardType') }} {{ '鹏城励读证' }}
        </div>
        <div class="item">
          {{ t('validTime') }} {{ '20330407' }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.qrcode-page {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  .overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: fade(#000, 40);
    backdrop-filter: blur(0.2rem);
    z-index: 3;
    transition: all 0.2s ease-in-out;
  }

  .qrcode-cont-wrap {
    position: absolute;
    top: 50%;
    left: 0.2rem;
    right: 0.2rem;
    z-index: 10;
    padding: 0.16rem 0.06rem 0;
    transform: translateY(calc(-50% - 0.47rem));
    border-radius: 0.1rem;
    background: linear-gradient(285deg, #4060d0 -12.9%, #4d6ef6 52.81%, #4162d3 115.95%);
  }
}

.logo {
  margin-bottom: 0.16rem;
  text-align: center;

  img {
    width: 1.79rem;
  }
}

.type-valid-time {
  display: flex;
  justify-content: space-between;
  margin: 0.12rem 0;
  padding: 0 0.1rem;
  color: #fff;
  font-weight: 400;
  font-size: 0.12rem;
  line-height: 1.4;
}

.qrcode-wrap {
  padding-bottom: 0.38rem;
  border-radius: 0.08rem;
  background-color: #fff;
  overflow: hidden;

  .qrcode-title {
    height: 0.42rem;
    text-align: center;
    line-height: 0.42rem;
    background-color: #f5f5f5;
    color: #444;
    font-weight: 400;
    font-size: 0.12rem;

    span.en {
      position: relative;
      margin-right: 17px;

      &::before {
        position: absolute;
        top: 50%;
        right: -0.16rem;
        display: inline-block;
        width: 0.005rem;
        height: 0.09rem;
        margin: 0 0.08rem;
        background-color: #444;
        content: "";
        transform: translateY(-50%);
      }
    }
  }

  .qrcode {
    padding-top: 0.36rem;
    text-align: center;
  }

  .read-card-wrap {
    text-align: center;

    .read-card {
      display: inline-block;
      margin: 0.16rem auto 0;
      padding: 0.05rem 0.14rem;
      color: #777;
      font-weight: 400;
      font-size: 0.13rem;
      line-height: 1.4;
      border: 0.005rem solid #d9d9d9;
      border-radius: 0.04rem;

      .cardno {
        color: var(--primary-color);
      }
    }
  }
}
</style>
