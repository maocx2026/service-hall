<script lang="ts">
import { defineComponent } from 'vue';
import { Loading } from 'vant';

export default defineComponent({
  components: {
    VLoading: Loading,
  },
});
</script>

<template>
  <VLoading
    class="loading"
    v-bind="$attrs"
  />
</template>

<style lang="less" scoped>
.loading {
  margin-top: 120px;
  text-align: center;
}
</style>
