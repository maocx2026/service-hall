<script lang="ts">
import { defineComponent, computed } from 'vue';
import { DatePicker } from 'vant';
import addYears from 'date-fns/addYears';

import { namespaceT } from '@/helps/namespace-t';

export default defineComponent({
  components: {
    VDatePicker: DatePicker,
  },

  setup() {
    const t = namespaceT('dateFormat');
    const columnsType = ['year', 'month'];

    const formatter = (type, option) => {
      const newOption = { ...option };
      if (type === 'year') {
        newOption.text += t('year');
      }

      if (type === 'month') {
        newOption.text += t('month');
      }

      return newOption;
    };

    const minDate = computed(() => {
      return addYears(new Date(), -10);
    });

    const maxDate = computed(() => {
      return addYears(new Date(), 10);
    });

    return {
      minDate,
      maxDate,
      formatter,
      columnsType,
    };
  },
});
</script>

<template>
  <VDatePicker
    :min-date="minDate"
    :max-date="maxDate"
    :formatter="formatter"
    :columns-type="columnsType"
    :show-toolbar="false"
    v-bind="$attrs"
  />
</template>
