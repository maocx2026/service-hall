<script lang="ts">
import { defineComponent } from 'vue';

import FloatInfoPanel from './components/float-info-panel.vue';


export default defineComponent({
  components: {
    FloatInfoPanel,
  },

  setup() {
    return {};
  },
});
</script>


<template>
  <div class="discover-detail-page">
    <FloatInfoPanel />
  </div>
</template>

<style lang="less" scoped>
.discover-detail-page {
  height: 100%;
  // TODO:地图先用图片代替
  background: url("@/assets/img/map.png") no-repeat;
  background-size: 100% auto;
}
</style>
