<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue';
import { Icon, Button } from 'vant';

import { namespaceT } from '@/helps/namespace-t';
import { push } from '@/helps/navigation';
import { RouterName as RN } from '@/config/router';

import CardUpLevel from './components/card-up-level.vue';


export default defineComponent({
  components: {
    VIcon: Icon,
    VButton: Button,
    CardUpLevel,
  },

  setup() {
    const vm = getCurrentInstance();
    const t = namespaceT('applyVirtualltCard.success');
    const showLevelUp = ref(false);

    function goToOpenWifi() {
      push(vm.proxy.$router, {
        name: RN.Wifi,
      });
    }

    function onBackHome() {
      push(vm.proxy.$router, {
        name: RN.Home,
      });
    }

    function onUpLevelCard() {
      showLevelUp.value = true;
    }

    return {
      t,
      showLevelUp,

      goToOpenWifi,
      onBackHome,
      onUpLevelCard,
    };
  },
});
</script>


<template>
  <div class="aplly-virtual-card">
    <div class="logo">
      <img
        src="@/assets/img/qrcode-logo.png"
        alt=""
      >
    </div>

    <div class="content-wrap">
      <div class="succ-title">
        <VIcon
          name="checked"
          color="#95F570"
          :size="80"
        />
        <div>
          {{ t('succTitle') }}
        </div>
      </div>

      <div class="content">
        <div class="item">
          {{ t('readNo') }}
          {{ '0440002763139' }}
        </div>
        <div class="item">
          {{ t('selfPwd') }}
          {{ t('selfPwdCont') }}
        </div>
        <div class="item">
          {{ t('borrowAuth') }}
          {{ '可借中文文献10册/件+原版外文图书1册/件' }}
        </div>
        <div class="item">
          {{ t('wifiService') }}
          <a
            href="#"
            class="a-primary-btn"
            @click.stop.prevent="goToOpenWifi"
          >
            {{ t('openWifi') }}
          </a>
        </div>

        <div class="actions">
          <VButton
            block
            type="primary"
            class="vant-primary-btn"
            @click="onBackHome"
          >
            {{ t('backHome') }}
          </VButton>
          <VButton
            block
            type="primary"
            class="vant-primary-btn"
            @click="onUpLevelCard"
          >
            {{ t('upLevelReadCard') }}
          </VButton>
        </div>

        <CardUpLevel v-if="showLevelUp" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.aplly-virtual-card {
  height: 100vh;
  width: 100vw;
  overflow: auto;
  background: url("@/assets/img/aplly-virtual-card-bg.png") no-repeat;
  background-position: bottom left;
  background-size: 100% auto;
  background-color: #2645ad;

  .logo {
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    text-align: center;

    img {
      width: 1.79rem;
    }
  }
}

.content-wrap {
  color: #fff;

  .succ-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.12rem;
    font-weight: 500;
    font-size: 0.18rem;
  }

  .content {
    padding: 0.2rem 0.5rem 0.2rem;

    .item {
      margin-bottom: 0.04rem;
      font-weight: 400;
      font-size: 0.15rem;
      line-height: 1.45;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 0.2rem;
      margin-top: 0.2rem;

      .vant-primary-btn {
        border: 0;
      }
    }
  }
}

.a-primary-btn {
  display: inline-block;
  padding: 0.04rem 0.12rem;
  color: #fff;
  font-size: 0.14rem;
  background-color: var(--primary-color);
  border-radius: 0.04rem;
}
</style>
