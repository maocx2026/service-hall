<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    date: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {
    const cls = computed(() => {
      return {
        today: props.date.isToday,
        dot: props.date.hasDot,
        past: props.date.isPast,
        other: !props.date.isSameMonth,
        active: props.date.isSelect,
      };
    });

    return {
      cls,
    };
  },
});
</script>


<template>
  <div
    class="date-item"
    :class="cls"
  >
    <template v-if="date.isSameMonth">
      {{ date.date }}
    </template>
  </div>
</template>

<style lang="less" scoped>
.date-item {
  position: relative;
  width: 0.32rem;
  height: 0.32rem;
  margin: 0 auto;
  padding-top: 0.03rem;
  padding-bottom: 0.1rem;
  color: #222;
  font-weight: 500;
  font-size: 0.16rem;
  line-height: 0.2rem;
  border-radius: 50%;

  &.active {
    color: #fff;
    background-color: var(--primary-color);
  }

  &.dot::after {
    position: absolute;
    left: 50%;
    bottom: 0.04rem;
    display: inline-block;
    width: 0.04rem;
    height: 0.04rem;
    background-color: var(--primary-color);
    border-radius: 50%;
    transform: translateX(-50%);
    content: "";
  }

  &.dot {
    &.other::after {
      display: none;
    }

    &.past::after {
      background-color: #d9d9d9;
    }

    &.active::after {
      background-color: #fff;
    }
  }

  &.other {
    display: none;
  }
}
</style>
