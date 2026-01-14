<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import _ from 'lodash';
import addMonths from 'date-fns/addMonths';

import { dateFormatSTZ } from '@/helps/date';
import { namespaceT } from '@/helps/namespace-t';
import { getFullMonDays } from '../../helps/utils-calendar';

import CalendarComp from './callendar-comp.vue';

export default defineComponent({
  components: {
    CalendarComp,
  },

  props: {
    modelValue: {
      type: Date,
      default: () => new Date(),
    },
  },

  emits: [
    'toggle',
    'select',
  ],

  setup(props, { emit }) {
    const td = namespaceT('dateFormat');
    const selectedDate = ref(props.modelValue);
    const initCalendarDate = ref(props.modelValue);
    const dateList = ref([]);

    const formatSelectedDate = computed(() => {
      return dateFormatSTZ(initCalendarDate.value, td('chnMonth'));
    });

    function toggleCalendar() {
      emit('toggle');
    }

    function initCalendarData(date) {
      initCalendarDate.value = date;
      const thisMonthDays = getFullMonDays(date, selectedDate.value);
      dateList.value = _.chunk([...thisMonthDays], 7);
    }

    function selectDate(date) {
      selectedDate.value = date;
      initCalendarData(date);
      emit('select', date);
    }

    function onPreviewMonth() {
      const date = addMonths(initCalendarDate.value, -1);
      initCalendarData(date);
    }

    function onNextMonth() {
      const date = addMonths(initCalendarDate.value, 1);
      initCalendarData(date);
    }

    onMounted(() => {
      initCalendarData(initCalendarDate.value);
    });

    return {
      formatSelectedDate,
      dateList,

      toggleCalendar,
      selectDate,
      onPreviewMonth,
      onNextMonth,
    };
  },
});
</script>

<template>
  <div class="full-canlendar">
    <div class="header">
      <div class="change-mon">
        <div
          class="spirte spirte-calendar-left"
          @click="onPreviewMonth"
        />
        <div class="mon">
          {{ formatSelectedDate }}
        </div>
        <div
          class="spirte spirte-calendar-right"
          @click="onNextMonth"
        />
      </div>

      <div
        class="spirte spirte-calandar-arrow-up"
        @click="toggleCalendar"
      />
    </div>

    <CalendarComp
      :dates="dateList"
      @select="selectDate"
    />
  </div>
</template>

<style lang="less" scoped>
.full-canlendar {
  padding: 0.16rem 0.16rem 0.14rem 0.14rem;
  border-radius: 0.08rem;
  background-color: #fff;
  box-shadow: 0px 2px 6px 0px fade(#000, 3);
}

.header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .mon {
    color: #222;
    font-weight: 700;
    font-size: 0.18rem;
    line-height: 0.19rem;
  }

  .change-mon {
    display: flex;
    align-items: center;
    gap: 0.16rem;
  }

  .spirte-calandar-arrow-up {
    position: absolute;
    top: 0.02rem;
    right: 0;
  }
}
</style>
