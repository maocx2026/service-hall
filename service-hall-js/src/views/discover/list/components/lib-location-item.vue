<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },

  setup() {
    return {};
  },
});
</script>

<template>
  <div class="library-wrap">
    <div class="meta">
      <div class="name">
        {{ content.libName }}
      </div>
      <div class="location">
        <div class="spirte spirte-activity-location" />
        {{ content.location }}
      </div>
    </div>

    <div class="distance">
      <div class="spirte spirte-discover-location" />
      {{ content.distance }}m
    </div>
  </div>
</template>

<style lang="less" scoped>
.library-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.08rem;
  padding: 0.06rem;
  padding-left: 0.14rem;
  border-radius: 0.08rem;
  background-color: #fff;

  .meta {
    flex: 1;
    line-height: 1.4;

    .name {
      color: #444;
      font-weight: 500;
      font-size: 0.15rem;
    }

    .location {
      display: flex;
      align-items: center;
      gap: 0.03rem;
      margin-top: 0.05rem;
      color: #777;
      font-weight: 400;
      font-size: 0.12rem;
    }
  }

  .distance {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    width: 0.61rem;
    height: 0.61rem;
    padding: 0.1rem 0 0.12rem;
    color: #777;
    font-weight: 400;
    font-size: 0.11rem;
    border-radius: 0.05rem;
    background-color: #f7f8ff;
  }
}
</style>
