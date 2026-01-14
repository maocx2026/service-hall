<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';
import { Button } from 'vant';

import { namespaceT } from '@/helps/namespace-t';
import { push } from '@/helps/navigation';
import { RouterName as RN } from '@/config/router';

export default defineComponent({
  components: {
    VButton: Button,
  },

  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },

  setup() {
    const vm = getCurrentInstance();
    const t = namespaceT('activitySign');

    function onClickViewMyPosition() {
      push(vm.proxy.$router, {
        name: RN.MyPosition,
      });
    }

    function onClickSign() {
      // TODO:签到逻辑
      console.log('TODO:签到');
    }

    return {
      t,

      onClickViewMyPosition,
      onClickSign,
    };
  },
});
</script>


<template>
  <div class="list-item">
    <div class="title">
      {{ content.title }}
    </div>
    <div class="item">
      {{ t('label.activityTime') }}
      {{ content.startTime }} - {{ content.endTime }}
    </div>
    <div class="item">
      {{ t('label.activityAddress') }}
      {{ content.activityAddress }}
    </div>

    <VButton
      block
      type="primary"
      class="vant-primary-btn"
      @click="onClickSign"
    >
      {{ t('action.sign') }}
    </VButton>
    <a
      class="text-btn block"
      @click.stop.prevent="onClickViewMyPosition"
    >
      {{ t('action.viewMyPosition') }}
    </a>
  </div>
</template>

<style lang="less" scoped>
.text-btn {
  margin-top: 0.12rem;
}

.list-item {
  padding: 0.16rem 0.14rem 0.12rem;
  line-height: 1.45;

  .title {
    margin-bottom: 0.12rem;
    color: #1d2129;
    font-weight: 600;
    font-size: 0.18rem;
  }

  .item {
    margin-bottom: 0.04rem;
    color: #777;
    font-weight: 400;
    font-size: 0.14rem;
  }
}

.vant-primary-btn {
  margin-top: 0.24rem;
}
</style>
