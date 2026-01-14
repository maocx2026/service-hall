<script lang="ts">
import { defineComponent } from 'vue';
import { Button } from 'vant';

export default defineComponent({
  components: {
    VButton: Button,
  },

  setup() {
    return {};
  },
});
</script>

<template>
  <VButton
    block
    icon="plus"
    class="choose-book-btn"
  >
    {{ $t('expressBookCart.text.chooseBooks') }}
  </VButton>
</template>

<style lang="less" scoped>
.choose-book-btn {
  margin-top: 0.08rem;
  border: 0;
  color: var(--primary-color);
  font-weight: 400;
  font-size: 0.15rem;
}
</style>
