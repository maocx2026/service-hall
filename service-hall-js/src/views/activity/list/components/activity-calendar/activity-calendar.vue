<script lang="ts">
import { defineComponent, ref } from 'vue';

import SimpleCalendar from './simple-calendar.vue';
import FullCalendar from './full-calendar.vue';

export default defineComponent({
  components: {
    SimpleCalendar,
    FullCalendar,
  },

  emits: [
    'select',
  ],

  setup(props, { emit }) {
    const isShowFullCalendar = ref(false);
    const selectedDate = ref(new Date());

    function toggleCalendar() {
      isShowFullCalendar.value = !isShowFullCalendar.value;
    }

    function onSelectDate(date) {
      selectedDate.value = date;
      emit('select', date);
    }

    return {
      isShowFullCalendar,
      selectedDate,

      toggleCalendar,
      onSelectDate,
    };
  },
});
</script>

<template>
  <div class="">
    <FullCalendar
      v-if="isShowFullCalendar"
      v-model="selectedDate"
      @toggle="toggleCalendar"
      @select="onSelectDate"
    />
    <SimpleCalendar
      v-else
      v-model="selectedDate"
      @toggle="toggleCalendar"
      @select="onSelectDate"
    />
  </div>
</template>
