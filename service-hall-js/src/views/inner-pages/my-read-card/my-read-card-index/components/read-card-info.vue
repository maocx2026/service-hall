<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';

import { namespaceT } from '@/helps/namespace-t';
import { push } from '@/helps/navigation';
import { RouterName as RN } from '@/config/router';


export default defineComponent({
  setup() {
    const vm = getCurrentInstance();
    const t = namespaceT('mine');

    function onClickReadPoint() {
      push(vm.proxy.$router, {
        name: RN.ReadPoint,
      });
    }

    function onClickCreditPoint() {
      push(vm.proxy.$router, {
        name: RN.CreditPoint,
      });
    }

    function onClickQrcode() {
      vm.proxy.$eventBus.emit('on-click-qrcode');
    }

    return {
      t,

      onClickReadPoint,
      onClickCreditPoint,
      onClickQrcode,
    };
  },
});
</script>

<template>
  <div class="read-card-wrapper">
    <div class="read-card">
      <div class="title">
        <span class="en">{{ t('readCardEn') }}</span>
        <span>{{ t('readCardZh') }}</span>
      </div>

      <div class="reader-name">
        <span class="name">谢钟琪</span>
        <div class="card-type">
          {{ t('cardType') }} {{ '鹏城励读证' }}
        </div>
      </div>

      <div class="cardno">
        0440002763139
      </div>

      <div class="points-and-qrcode">
        <div class="points">
          <div
            class="point-item"
            @click="onClickCreditPoint"
          >
            <div class="point">
              {{ 296 }} {{ t('points') }}
            </div>
            <div class="point-title">
              {{ t('creditPoint') }}
              <div class="spirte spirte-right-arrow" />
            </div>
          </div>
          <div
            class="point-item"
            @click="onClickReadPoint"
          >
            <div class="point">
              {{ 36 }} {{ t('points') }}
            </div>
            <div class="point-title">
              {{ t('readPoint') }}
              <div class="spirte spirte-right-arrow" />
            </div>
          </div>
        </div>
        <div
          class="spirte spirte-mine-qrcode"
          @click="onClickQrcode"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.read-card-wrapper {
  min-height: 1.75rem;
  margin: 0 0.12rem 0.12rem;
  padding: 0.16rem;
  padding-left: 0.2rem;
  color: #fff;
  border-radius: 0.12rem;
  background: linear-gradient(311deg, #4060D0 -3.29%, #4D6EF6 51.72%, #4162D3 104.58%);

  .read-card {
    height: 100%;
    background-image: url("@/assets/img/qrcode-logo.png");
    background-repeat: no-repeat;
    background-position: right top;
    background-size: 113px auto;

    > .title {
      color: fade(#fff, 80);
      font-weight: 400;
      font-size: 0.12rem;
      text-align: left;
      line-height: 1.5;

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
          background-color: fade(#fff, 80);
          content: "";
          transform: translateY(-50%);
        }
      }
    }
  }
}

.reader-name {
  display: flex;
  align-items: center;
  margin-top: 0.26rem;

  .name {
    margin-right: 0.05rem;
    font-weight: 500;
    font-size: 0.18rem;
    line-height: 1.5;
  }

  .card-type {
    height: 0.15rem;
    padding: 0.02rem 0.04rem;
    font-weight: 400;
    font-size: 0.09rem;
    line-height: 0.11rem;
    background-color: fade(#fff, 10);
  }
}

.cardno {
  margin-top: 0.01rem;
  font-size: 0.12rem;
  font-weight: 400;
  line-height: 1.2;
}

.points-and-qrcode {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.26rem;

  .points {
    display: flex;
    align-items: center;
    gap: 0.42rem;

    .point-item {
      .point {
        font-weight: 600;
        font-size: 0.16rem;
        line-height: 1.5;
      }

      .point-title {
        display: flex;
        align-items: center;
        font-size: 0.1rem;
        font-weight: 400;
        cursor: pointer;
      }
    }
  }
}

.spirte-mine-qrcode {
  cursor: pointer;
}
</style>
