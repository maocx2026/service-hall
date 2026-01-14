<script lang="ts">
import { defineComponent, ref, computed, toRef } from 'vue';

import { namespaceT } from '@/helps/namespace-t';

import MonthPicker from './month-picker.vue';

export default defineComponent({
  components: {
    MonthPicker,
  },

  props: {
    modelValue: {
      type: Object,
      default: () => ({
        startDate: [],
        endDate: [],
      }),
    },

    label: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const tm = namespaceT('common');
    const model = toRef(props, 'modelValue');

    const isShowStartDate = ref(true);

    const formatStartVal = computed(() => {
      if (model.value.startDate.length) {
        return model.value.startDate.join('-');
      }
      return undefined;
    });

    const formatEndVal = computed(() => {
      if (model.value.endDate.length) {
        return model.value.endDate.join('-');
      }
      return undefined;
    });

    function changeShowStartItem(val) {
      isShowStartDate.value = val;
    }

    return {
      tm,
      formatStartVal,
      formatEndVal,
      isShowStartDate,
      model,

      changeShowStartItem,
    };
  },
});
</script>

<template>
  <div class="month-range-picker-wrap">
    <div
      v-if="label"
      class="label"
    >
      {{ label }}
    </div>

    <div class="value-box">
      <div
        class="value-item"
        :class="{'active': isShowStartDate}"
        @click="changeShowStartItem(true)"
      >
        <span
          v-if="formatStartVal"
          class="value"
        >
          {{ formatStartVal }}
        </span>
        <span
          v-else
          class="placeholder"
        >
          {{ tm('placeholder.startDate') }}
        </span>
      </div>
      <div class="spirte spirte-date-pick-arrow" />
      <div
        class="value-item"
        :class="{'active': !isShowStartDate}"
        @click="changeShowStartItem(false)"
      >
        <span
          v-if="formatEndVal"
          class="value"
        >
          {{ formatEndVal }}
        </span>
        <span
          v-else
          class="placeholder"
        >
          {{ tm('placeholder.endDate') }}
        </span>
      </div>
    </div>
    <MonthPicker
      v-show="isShowStartDate"
      v-model="model.startDate"
    />
    <MonthPicker
      v-show="!isShowStartDate"
      v-model="model.endDate"
    />
  </div>
</template>

<style lang="less" scoped>
.month-range-picker-wrap {
  background-color: #fff;

  .label {
    padding-left: 0.04rem;
    margin-bottom: 0.16rem;
    color: #222;
    font-weight: 500;
    font-size: 0.16rem;
    line-height: 1.45;
  }

  .value-box {
    display: flex;
    align-items: center;
    gap: 0.04rem;

    .value-item {
      flex: 1;
      padding-bottom: 0.1rem;
      border-bottom: 1px solid #e6e6e6;
      text-align: center;
      transition: all 0.2s ease-in;

      .value {
        color: #222;
        font-weight: 700;
        font-size: 0.18rem;
      }

      .placeholder {
        color: #bababa;
        font-weight: 400;
        font-size: 0.16rem;
      }

      &.active {
        border-bottom: 2px solid var(--primary-color);
      }
    }
  }
}
</style>
