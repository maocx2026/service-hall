<script lang="ts">
import { defineComponent } from 'vue';

import { getActivityStatusThemeClass, getActivityStatusText } from '../helps/activity-status';

export default defineComponent({
  props: {
    model: {
      type: Object,
      default: () => {},
    },
  },

  setup() {
    return {
      getActivityStatusText,
      getActivityStatusThemeClass,
    };
  },
});
</script>


<template>
  <div class="activity-header">
    <div class="status-type">
      <div class="type">
        {{ model.activityType }}
      </div>
      <div
        class="status"
        :class="getActivityStatusThemeClass(model.status)"
      >
        {{ getActivityStatusText(model.status) }}
      </div>
    </div>

    <div class="title">
      {{ model.title }}
    </div>

    <div class="activity-time">
      <div class="spirte spirte-activity-time" />
      <div class="time">
        {{ model.activityTime }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.activity-header {
  padding: 0.16rem 0.12rem 0.4rem 0.2rem;
  color: #fff;
  background: linear-gradient(311deg, #4060D0 -3.29%, #4D6EF6 51.72%, #4162D3 104.58%);;
}

.status-type {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .type {
    color: #dae0f9;
    font-weight: 400;
    font-size: 0.13rem;
    line-height: 0.18rem;
  }

  .status {
    position: relative;
    padding: 0.02rem 0.06rem;
    font-weight: 400;
    font-size: 0.11rem;
    border-radius: 0.105rem;

    &.orange {
      color: #fff;
      background: linear-gradient(279deg, #fd7018 0%, #fe8917 100%);;
    }

    &.gray {
      color: #777;
      background-color: #d9d9d9;
    }
  }
}

.title {
  margin-top: 0.06rem;
  font-weight: 600;
  font-size: 0.18rem;
  line-height: 0.25rem;
}

.activity-time {
  display: flex;
  align-items: center;
  gap: 0.04rem;
  margin-top: 0.04rem;

  .time {
    color: #dae0f9;
    font-weight: 300;
    font-size: 0.14rem;
  }
}
</style>
