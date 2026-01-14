<script lang="ts">
import { defineComponent } from 'vue';

import { namespaceT } from '@/helps/namespace-t';

export default defineComponent({
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
  },

  setup() {
    return {
      t: namespaceT('myReadCard.serviceSearchOpen.borrowRule'),
    };
  },
});
</script>

<template>
  <table class="sh-table">
    <thead>
      <tr>
        <td class="library-title border-top-left-radius">
          {{ t('borrowType') }}
        </td>
        <td>
          {{ t('borrowLimit') }}
        </td>
        <td class="border-top-right-radius">
          {{ t('borrowDays') }}
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, idx) in dataSource"
        :key="item.id"
      >
        <td
          class="library-title"
          :class="{'border-bottom-left-radius': idx === dataSource.length - 1}"
        >
          {{ item.type }}
        </td>
        <td>
          {{ item.limit }}
        </td>
        <td
          :class="{'border-bottom-right-radius': idx === dataSource.length - 1}"
        >
          {{ item.days }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="less" scoped>
.sh-table {
  tr td {
    padding: 0 0.14rem;
  }
}
</style>
