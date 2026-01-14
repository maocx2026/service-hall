<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import { RadioGroup, Radio, Button } from 'vant';

import { openToastError } from '@/helps/toast';
import { namespaceT } from '@/helps/namespace-t';
import { openConfirmDialog, openMessagerDialog } from '@/helps/dialog';

import LoadingComp from '@/components/common/loading-comp.vue';

import { FamilyAccountSampleData } from './helps/sample-data';

export default defineComponent({
  components: {
    VRadioGroup: RadioGroup,
    VRadio: Radio,
    VButton: Button,
    LoadingComp,
  },

  setup() {
    const t = namespaceT('familyAccount');
    const currentUser = reactive({
      name: '',
      idCardNo: '',
    });
    const familyAccountList = ref([]);
    const loading = ref(false);
    const selectedAccount = ref('');

    function onLoadData() {
      try {
        loading.value = true;
        // TODO:初始化页面数据
        Object.assign(currentUser, {
          name: '谢钟琪',
          idCardNo: '0440002763139',
        });
        selectedAccount.value = '0440002763139';
        familyAccountList.value = FamilyAccountSampleData;
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

    function onAddFamilyAccount() {
      console.log('TODO:添加亲情账号');
    }

    function onLogoutCurrentReader() {
      console.log('TODO:退出当前读者');
    }

    function onTemporaryLogin() {
      console.log('TODO:临时登录');
    }

    function onRemoveAccount() {
      openConfirmDialog(t('confirmRemove'), () => {
        console.log('TODO:取消关联的逻辑');
      });
    }

    function onAccountChange(cardNo) {
      openMessagerDialog(t('welcomeNewAccount', { cardNo }), () => {
        console.log('TODO:切换用户的逻辑');
      });
    }

    return {
      t,
      familyAccountList,
      currentUser,
      loading,
      selectedAccount,

      onAddFamilyAccount,
      onLogoutCurrentReader,
      onTemporaryLogin,
      onRemoveAccount,
      onAccountChange,
    };
  },
});
</script>


<template>
  <LoadingComp v-if="loading" />
  <div
    v-else
    class="inner-page"
  >
    <div class="family-list">
      <VRadioGroup
        v-model="selectedAccount"
        class="sh-vant-radio-group"
        shape="dot"
      >
        <VRadio
          :name="currentUser.idCardNo"
          class="sh-vant-radio"
        >
          {{ currentUser.idCardNo }} {{ currentUser.name }}
        </VRadio>
        <VRadio
          v-for="item in familyAccountList"
          :key="item.idCardNo"
          :name="item.idCardNo"
          class="sh-vant-radio"
          @click="onAccountChange(item.idCardNo)"
        >
          <div class="radio-item-content">
            <span>
              {{ item.idCardNo }} {{ item.name }}
            </span>
            <div
              class="icon-remove"
              @click.stop.prevent="onRemoveAccount"
            />
          </div>
        </VRadio>
      </VRadioGroup>
    </div>

    <div class="add-block">
      <VButton
        icon="add-o"
        type="primary"
        class="add-account-btn vant-primary-btn"
        @click="onAddFamilyAccount"
      >
        {{ t('addFamily') }}
      </VButton>
    </div>

    <div class="warm-tip">
      <div class="title">
        {{ t('warmTip.title') }}
      </div>
      <div class="content">
        {{ t('warmTip.content') }}
      </div>
    </div>

    <div class="action-block">
      <VButton
        block
        type="primary"
        class="vant-primary-btn"
        @click="onLogoutCurrentReader"
      >
        {{ t('logoutCurrentAccount') }}
      </VButton>
      <VButton
        block
        type="primary"
        class="vant-primary-btn"
        @click="onTemporaryLogin"
      >
        {{ t('temporaryLogin') }}
      </VButton>
    </div>
  </div>
</template>

<style lang="less" scoped>
.family-list {
  box-shadow: 0 0.03rem 0.31rem 0 rgba(102, 102, 102, 0.17);
  border-radius: 0.24rem;
  padding: 0 0.3rem;
}

.add-block {
  text-align: center;

  .add-account-btn {
    margin-top: 0.16rem;
    color: var(--primary-color);
    background-color: transparent;
    border: 0;
  }
}

.warm-tip {
  padding: 0.2rem 0.4rem;
  color: #777;
  font-weight: 400;
  font-size: 0.15rem;
  line-height: 1.5;

  .title {
    font-weight: 600;
    color: var(--primary-color);
  }
}

:deep(.van-radio__label) {
  flex: 1;
}

.radio-item-content {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .icon-remove {
    display: inline-block;
    width: 0.18rem;
    height: 0.18rem;
    background: url("@/assets/img/remove.png") no-repeat;
    background-size: 100%;
    cursor: pointer;
  }
}
</style>
