<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue';
import { RadioGroup, Radio, Button } from 'vant';

import { namespaceT } from '@/helps/namespace-t';
import { openToastError } from '@/helps/toast';

import LoadingComp from '@/components/common/loading-comp.vue';

import { getAuthTypeOptions } from './helps/sample-data';

export default defineComponent({
  components: {
    LoadingComp,
    VRadioGroup: RadioGroup,
    VRadio: Radio,
    VButton: Button,
  },

  setup() {
    const t = namespaceT('myReadCard.changeCardAuth');
    const loading = ref(false);
    const saving = ref(false);
    const model = reactive({
      deposit: 0, // 押金
      books: '', // 可借图书
    });
    const authType = ref('');
    const authTypeLists = ref(getAuthTypeOptions());

    function onLoadData() {
      try {
        loading.value = true;
        // TODO:获取读者证信息
        Object.assign(model, {
          deposit: 0, // 押金
          books: '中文文献10册+外文原版图书1册', // 可借图书
        });
      } catch (error) {
        openToastError(error.message);
        throw error;
      } finally {
        loading.value = false;
      }
    }

    onMounted(() => {
      onLoadData();
    });

    function onWechartPay() {
      try {
        saving.value = true;
        // TODO:微信支付
        console.log('authType', authType.value);
      } catch (error) {
        openToastError(error.message);
        throw error;
      } finally {
        saving.value = false;
      }
    }

    return {
      t,
      model,
      loading,
      authType,
      saving,

      authTypeLists,

      onWechartPay,
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

    <LoadingComp v-if="loading" />
    <div
      v-else
      class="content-wrap"
    >
      <div class="summary">
        {{ t('changdesc', {
          deposit: model.deposit,
          books: model.books,
        }) }}
      </div>
      <div class="select">
        {{ t('pleaseChoose') }}
      </div>

      <div class="select-options">
        <VRadioGroup
          v-model="authType"
          shape="dot"
          class="radio-group"
        >
          <VRadio
            v-for="item in authTypeLists"
            :key="item.key"
            :name="item.key"
            class="radio"
          >
            {{ item.text }}
          </VRadio>
        </VRadioGroup>
      </div>

      <VButton
        v-if="authType"
        block
        type="primary"
        class="vant-primary-btn"
        :loading="saving"
        icon="wechat-pay"
        @click="onWechartPay"
      >
        {{ t('wechartPay') }}
      </VButton>
    </div>
  </div>
</template>

<style lang="less" scoped>
.aplly-virtual-card {
  height: 100vh;
  width: 100vw;
  overflow: auto;
  color: #fff;
  font-weight: 400;
  font-size: 0.15rem;
  line-height: 1.45;
  background: url("@/assets/img/aplly-virtual-card-bg.png") no-repeat;
  background-position: bottom left;
  background-size: 100% auto;
  background-color: #2645ad;

  .logo {
    margin-top: 0.8rem;
    margin-bottom: 0.7rem;
    text-align: center;

    img {
      width: 1.79rem;
    }
  }
}

.content-wrap {
  padding: 0 0.4rem;
}

.summary {
  text-indent: 0.28rem;
}

.select {
  margin-top: 0.08rem;
}

.select-options {
  margin-top: 0.08rem;
}

.radio-group {
  margin-top: 0.2rem;

  .radio {
    margin-bottom: 0.08rem;

    :deep(.van-radio__label) {
      color: #fff;
      font-weight: 400;
      font-size: 0.14rem;
    }

    :deep(.van-radio__icon--dot) {
      background-color: #fff;
    }

    :deep(.van-radio__icon--checked.van-radio__icon--dot) {
      border-color: #fff;

      .van-radio__icon--dot__icon {
        background-color: var(--primary-color);
      }
    }
  }
}

.vant-primary-btn {
  margin-top: 0.2rem;
  border: 0;
}
</style>
