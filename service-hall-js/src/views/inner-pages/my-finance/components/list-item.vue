<script lang="ts">
import { defineComponent } from 'vue';

import { namespaceT } from '@/helps/namespace-t';

export default defineComponent({
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },

  setup() {
    const t = namespaceT('myFinance');

    return {
      t,
    };
  },
});
</script>


<template>
  <div class="list-item">
    <div class="left-part">
      <div class="title">
        {{ content.title }}
      </div>
      <div class="library">
        {{ t('label.library') }}
        {{ content.library }}
      </div>
      <div class="operate-time">
        {{ content.operateTime }}
      </div>
    </div>

    <div class="right-part">
      <div class="money">
        {{ content.money > 0 ? `+${content.money}` : content.money }}
      </div>

      <div class="payment">
        {{ content.payment }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.08rem;
  padding: 0.14rem;
  border-radius: 0.08rem;
  background-color: #fff;
}

.left-part {
  font-weight: 400;
  font-size: 0.12rem;
  text-align: left;
  line-height: 1.46;

  .title {
    margin-bottom: 0.04rem;
    color: #444;
    font-weight: 600;
    font-size: 0.15rem;
  }

  .library {
    margin-bottom: 0.04rem;
    color: #777;
  }

  .operate-time {
    color: #999;
  }
}

.right-part {
  text-align: right;

  .money {
    margin-bottom: 0.04rem;
    color: #222;
    font-weight: 500;
    font-size: 0.18rem;
  }

  .payment {
    height: 0.17rem;
    color: #f5aa52;
    font-weight: 400;
    font-size: 0.12rem;
  }
}
</style>
