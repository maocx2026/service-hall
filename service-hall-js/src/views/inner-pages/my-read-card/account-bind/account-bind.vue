<script lang="ts">
import { defineComponent } from 'vue';

import BindVolunteerId from './components/bind-volunteer-id.vue';
import WechartBind from './components/wechart-bind.vue';


export default defineComponent({
  components: {
    BindVolunteerId,
    WechartBind,
  },

  setup() {
    return {};
  },
});
</script>


<template>
  <div class="inner-page">
    <!-- 绑定微信号 -->
    <WechartBind />
    <!-- 绑定义工号 -->
    <BindVolunteerId />
  </div>
</template>

<style lang="less" scoped>
:deep(.item) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 0.65rem;
  margin-bottom: 0.08rem;
  padding: 0.14rem;
  background-color: #fff;
  border-radius: 0.08rem;

  .left {
    display: flex;
    align-items: center;
    gap: 0.12rem;

    .title {
      color: #222;
      font-weight: 400;
      font-size: 0.14rem;;
    }
  }

  .right {
    display: flex;
    align-items: center;
    gap: 0.09rem;
    color: #bababa;
    font-weight: 400;
    font-size: 0.14rem;
  }
}
</style>
