<script lang="ts">
import { defineComponent } from 'vue';

import { namespaceT } from '@/helps/namespace-t';

export default defineComponent({
  setup() {
    return {
      t: namespaceT('bookAdvanceBorrow.cart'),
    };
  },
});
</script>

<template>
  <div class="result-wrap">
    <div class="spirte spirte-result-success" />
    <div class="title">
      {{ t('hint.addSuccess') }}
    </div>
    <div class="sub-title">
      {{ t('hint.subSucc') }}
    </div>
  </div>
</template>
