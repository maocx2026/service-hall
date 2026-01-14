<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { Tab, Tabs, List } from 'vant';

/// <reference types="../../../../types/common-api" />

import { useList } from '@/uses/list';
import { openToastError } from '@/helps/toast';

import ActivityCalendar from './components/activity-calendar';
import ActivityItem from './components/activity-item.vue';

import { createActivityTabs, ActivityType } from './helps/data';
import { SampleListData } from './helps/sample-data';
import { getActivityListTitle } from './helps/utils';

export default defineComponent({
  components: {
    VTab: Tab,
    VTabs: Tabs,
    VList: List,
    ActivityCalendar,
    ActivityItem,
  },

  setup() {
    const activeTab = ref(ActivityType.SALON);
    const selectedDate = ref(new Date());

    async function loadData(): Promise<CommonApiListData> {
      try {
        console.log(selectedDate.value, activeTab.value);
        // TODO:查询活动列表数据
        return SampleListData;
      } catch (error) {
        openToastError(error.message);
        throw error;
      }
    }

    const list = useList({
      fetch: loadData,
    });

    const items = computed(() => {
      return list.data.value;
    });

    async function refresh() {
      await list.refresh();
    }

    function onLoad() {
      list.load();
    }

    onMounted(() => {
      refresh();
    });

    const loading = computed(() => {
      return list.loading.value;
    });

    const finished = computed(() => {
      return list.finished.value;
    });

    function onSelectDate(date) {
      selectedDate.value = date;
      refresh();
    }

    return {
      items,
      list,
      loading,
      finished,
      activeTab,
      tabs: createActivityTabs(),

      onSelectDate,
      onLoad,
      getActivityListTitle,
      refresh,
    };
  },
});
</script>

<template>
  <div>
    <VTabs
      v-model:active="activeTab"
      class="activity-tabs"
      @change="refresh"
    >
      <VTab
        v-for="tab in tabs"
        :key="tab.key"
        :name="tab.key"
        :title="tab.title"
      />
      <div>
        <ActivityCalendar
          @select="onSelectDate"
        />

        <div class="title">
          {{ getActivityListTitle(activeTab) }}
        </div>

        <VList
          :loading="loading"
          :finished="finished"
          :finished-text="$t('common.hint.noMore')"
          @load="onLoad"
        >
          <ActivityItem
            v-for="item in items"
            :key="`item-${item.id}`"
            :content="item"
          />
        </VList>
      </div>
    </VTabs>
  </div>
</template>

<style lang="less">
.activity-tabs {
  &.van-tabs--line .van-tabs__wrap {
    height: 1.5rem;
    border-radius: 0 0 0.24rem 0.24rem;
    background: linear-gradient(311deg, #4060D0 -3.29%, #4D6EF6 51.72%, #4162D3 104.58%);

    .van-tabs__nav {
      box-sizing: border-box;
      height: 0.56rem;
      padding: 0.16rem;
      padding-bottom: 0.1rem;
      background: transparent;

      .van-tab {
        color: #fff;
        font-weight: 400;
        font-size: 0.16rem;
        line-height: 0.25rem;

        &.van-tab--active {
          font-weight: 600;
          font-size: 0.18rem;
        }
      }

      .van-tabs__line {
        bottom: 0.1rem;
        width: 0.16rem;
        height: 0.03rem;
        background-color: #fff;
        border-radius: 0.06rem;
      }
    }
  }

  .van-tabs__content {
    margin-top: -0.94rem;
    padding: 0 0.12rem;
  }
}
</style>

<style lang="less" scoped>
.title {
  margin-top: 0.2rem;
  margin-bottom: 0.1rem;
  color: #212121;
  font-weight: 500;
  font-size: 0.16rem;
}
</style>
