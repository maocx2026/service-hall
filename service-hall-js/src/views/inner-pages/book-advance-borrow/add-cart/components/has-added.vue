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
    <div class="spirte spirte-has-added-cart" />
    <div class="title">
      {{ t('hint.hasAdded') }}
    </div>
  </div>
</template>
