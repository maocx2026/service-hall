<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';

import { namespaceT } from '@/helps/namespace-t';
import { push } from '@/helps/navigation';
import { RouterName as RN } from '@/config/router';

import LoginPageWrap from '@/components/business/login-page-wrap.vue';
import LoginForm from './components/login-form.vue';


export default defineComponent({
  components: {
    LoginPageWrap,
    LoginForm,
  },

  setup() {
    const vm = getCurrentInstance();
    const t = namespaceT('login');

    function onClickApplyVirtualCard() {
      push(vm.proxy.$router, {
        name: RN.ApplyVirtuallyCard,
      });
    }

    function onClickFindPassword(idCardNo) {
      push(vm.proxy.$router, {
        name: RN.FindPassword,
        query: {
          idCardNo,
        },
      });
    }

    return {
      t,

      onClickApplyVirtualCard,
      onClickFindPassword,
    };
  },
});
</script>


<template>
  <LoginPageWrap :title="t('title')">
    <LoginForm @on-find-password="onClickFindPassword" />

    <div class="tips">
      <div class="item">
        {{ t('tips1') }}
      </div>
      <div class="item">
        {{ t('tips2') }}
      </div>
      <div class="item">
        {{ t('tips3[0]') }}
        <a
          href="#"
          class="link"
          @click.stop.prevent="onClickApplyVirtualCard"
        >
          {{ t('tips3[1]') }}
        </a>
        {{ t('tips3[2]') }}
      </div>
    </div>
  </LoginPageWrap>
</template>

<style lang="less" scoped>
.tips {
  padding: 0.24rem 0.14rem;
  color: #777;
  font-weight: 300;
  font-size: 0.14rem;
  line-height: 1.57;

  .item {
    margin-bottom: 0.16rem;

    .link {
      color: var(--primary-color);
      font-weight: 400;
      text-decoration-line: underline;
    }
  }
}
</style>
