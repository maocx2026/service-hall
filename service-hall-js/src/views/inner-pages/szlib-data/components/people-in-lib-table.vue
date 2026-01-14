<script lang="ts">
import { defineComponent } from 'vue';

import { namespaceT } from '@/helps/namespace-t';

export default defineComponent({
  props: {
    dataSource: {
      type: Object,
      default: () => {},
    },
  },

  setup() {
    return {
      t: namespaceT('szlibData.columns'),
    };
  },
});
</script>

<template>
  <table class="sh-table">
    <thead>
      <tr>
        <td class="library-title border-top-left-radius">
          {{ t('library') }}
        </td>
        <td>
          {{ t('inCountTotal') }}
        </td>
        <td class="border-top-right-radius">
          {{ t('realtimeInPeople') }}
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in dataSource.list"
        :key="item.id"
      >
        <td class="library-title">
          {{ item.library }}
        </td>
        <td>
          {{ item.totalCount }}
        </td>
        <td>
          {{ item.realTimeCount }}
        </td>
      </tr>

      <tr>
        <td class="library-title border-bottom-left-radius">
          {{ t('total') }}
        </td>
        <td>
          {{ dataSource.total.totalCount }}
        </td>
        <td class="border-bottom-right-radius">
          {{ dataSource.total.realTimeCount }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
