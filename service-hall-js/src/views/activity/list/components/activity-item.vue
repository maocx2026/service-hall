<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';

import { namespaceT } from '@/helps/namespace-t';
import { push } from '@/helps/navigation';
import { RouterName as RN } from '@/config/router';

export default defineComponent({
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {
    const vm = getCurrentInstance();
    const t = namespaceT('activity.label');

    function onClickActivityItem() {
      push(vm.proxy.$router, {
        name: RN.ActivityDetail,
        params: {
          id: props.content.id,
        },
      });
    }

    return {
      t,

      onClickActivityItem,
    };
  },
});
</script>


<template>
  <div
    class="activity-item"
    @click="onClickActivityItem"
  >
    <div class="title-wrap">
      <span class="title">
        {{ content.title }}
      </span>
      <span
        v-if="content.isNeedReserve"
        class="reserve-tag"
      >
        {{ t('needReserve') }}
      </span>
    </div>

    <div class="meta-item">
      {{ t('time') }}
      {{ content.time }}
    </div>

    <div class="meta-item">
      {{ t('library') }}
      {{ content.library }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.activity-item {
  margin-top: 0.08rem;
  padding: 0.14rem;
  background-color: #fff;
  border-radius: 0.04rem;
}

.title-wrap {
  .title {
    margin: 0;
    color: #444;
    font-weight: 500;
    font-size: 0.15rem;
    line-height: 1.5;
  }

  .reserve-tag {
    position: relative;
    top: -2px;
    display: inline-block;
    margin-left: 0.04rem;
    padding: 0.03rem 0.04rem;
    color: var(--primary-color);
    font-weight: 400;;
    font-size: 0.09rem;
    line-height: 0.11rem;
    border: 1px solid var(--primary-color);
    border-radius: 0.085rem;
  }
}

.meta-item {
  position: relative;
  margin-top: 0.04rem;
  padding-left: 0.08rem;
  color: #777;
  font-weight: 400;
  font-size: 0.12rem;

  &::before {
    position: absolute;
    left: 0;
    top: 50%;
    display: inline-block;
    width: 0.03rem;
    height: 0.03rem;
    border-radius: 100%;
    background-color: #d9d9d9;
    transform: translateY(-50%);
    content: "";
  }
}
</style>
