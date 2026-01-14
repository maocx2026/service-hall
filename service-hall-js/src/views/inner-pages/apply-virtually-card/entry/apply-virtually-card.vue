<script lang="ts">
import { defineComponent, ref } from 'vue';

import { namespaceT } from '@/helps/namespace-t';

import EntryInfo from './components/entry-info.vue';
import AgreeInfo from './components/agree-info.vue';


export default defineComponent({
  components: {
    EntryInfo,
    AgreeInfo,
  },

  setup() {
    const t = namespaceT('applyVirtualltCard');
    const showAgreePage = ref(false);

    function onClickApply() {
      showAgreePage.value = true;
    }

    return {
      t,
      showAgreePage,

      onClickApply,
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

    <AgreeInfo
      v-if="showAgreePage"
    />

    <EntryInfo
      v-else
      @on-apply="onClickApply"
    />
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
    margin-top: 0.8rem;
    margin-bottom: 0.7rem;
    text-align: center;

    img {
      width: 1.79rem;
    }
  }
}
</style>
