<script lang="ts">
import { defineComponent } from 'vue';

import { namespaceT } from '@/helps/namespace-t';

import CalendarDateItem from './calendar-date-item.vue';

export default defineComponent({
  components: {
    CalendarDateItem,
  },

  props: {
    dates: {
      type: Array,
      default: () => [],
    },
  },

  emits: [
    'select',
  ],

  setup(props, { emit }) {
    const td = namespaceT('dateFormat');

    const weekdays = [
      td('calendar.su'),
      td('calendar.mo'),
      td('calendar.tu'),
      td('calendar.we'),
      td('calendar.th'),
      td('calendar.fr'),
      td('calendar.sa'),
    ];

    function selectDate(date) {
      emit('select', date.d);
    }

    return {
      weekdays,

      selectDate,
    };
  },
});
</script>

<template>
  <table class="calendar-table">
    <thead class="as-head">
      <tr>
        <th
          v-for="(wd, i) of weekdays"
          :key="i"
          class="week-day-header"
        >
          {{ wd }}
        </th>
      </tr>
    </thead>
    <tbody class="as-body">
      <tr
        v-for="(week, weekIdx) of dates"
        :key="weekIdx"
      >
        <td
          v-for="(date, dateIdx) of week"
          :key="dateIdx"
          @click="selectDate(date)"
        >
          <CalendarDateItem
            :date="date"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="less" scoped>
.calendar-table {
  width: 100%;
  margin-top: 0.16rem;

  td {
    width: 14.28%;
    text-align: center;
  }

  .as-head th {
    color: #777;
    font-weight: 400;
    font-size: 0.12rem;
  }

  .as-body td {
    height: 0.4rem;
    padding-top: 0.08rem;
  }
}
</style>
