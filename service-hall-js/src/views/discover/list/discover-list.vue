<script lang="ts">
import { defineComponent, reactive, computed, onMounted, getCurrentInstance } from 'vue';
import { List } from 'vant';

/// <reference types="../../../../types/common-api" />

import { useList } from '@/uses/list';
import { openToastError } from '@/helps/toast';
import { push } from '@/helps/navigation';
import { RouterName as RN } from '@/config/router';

import TopDropDownMenu from './components/top-drop-down-menu.vue';
import SearchInput from './components/search-input.vue';
import LibLocationItem from './components/lib-location-item.vue';

import { createSearchModel } from './helps/data';
import { SampleListData, NearestLibrary } from './helps/sample-data';

export default defineComponent({
  components: {
    TopDropDownMenu,
    SearchInput,
    VList: List,
    LibLocationItem,
  },

  setup() {
    const vm = getCurrentInstance();
    const model = reactive(createSearchModel());

    async function loadData(): Promise<CommonApiListData> {
      try {
        // TODO:查询我身边的图书馆
        console.log('model', model);
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

    const loading = computed(() => {
      return list.loading.value;
    });

    const finished = computed(() => {
      return list.finished.value;
    });

    async function onSearch() {
      await list.refresh();
    }

    function onLoad() {
      list.load();
    }

    onMounted(() => {
      onSearch();
    });

    function onClickItemDetail({ id }) {
      push(vm.proxy.$router, {
        name: RN.DiscoverDetail,
        params: { id },
      });
    }

    return {
      model,
      items,
      list,
      loading,
      finished,

      NearestLibrary,

      onSearch,
      onLoad,
      onClickItemDetail,
    };
  },
});
</script>

<template>
  <div class="full-height">
    <TopDropDownMenu
      v-model="model"
      @change="onSearch"
    />
    <div class="content-wrapper">
      <SearchInput
        v-model="model"
        @search="onSearch"
      />

      <div class="library-list">
        <div class="list-title">
          {{ $t('discover.nearestLibrary') }}
        </div>
        <LibLocationItem
          :content="NearestLibrary"
          @click="onClickItemDetail(NearestLibrary)"
        />
        <div class="list-title mt-20">
          {{ $t('discover.nearByLibrary') }}
        </div>
        <VList
          :loading="loading"
          :finished="finished"
          :finished-text="$t('common.hint.noMore')"
          @load="onLoad"
        >
          <LibLocationItem
            v-for="item in items"
            :key="`item-${item.id}`"
            :content="item"
            @click="onClickItemDetail(item)"
          />
        </VList>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.content-wrapper {
  height: calc(100% - 0.52rem);
  margin-top: -0.24rem;
  padding-top: 0.16rem;
  border-top-left-radius: 0.24rem;
  border-top-right-radius: 0.24rem;
  background-color: #f7f8ff;
}

.library-list {
  height: calc(100% - 0.56rem);
  margin-top: 0.2rem;
  padding: 0 0.16rem;
  overflow: auto;

  .list-title {
    margin-bottom: 0.1rem;
    padding-left: 0.08rem;
    color: #212121;
    font-weight: 500;
    font-size: 0.16rem;
  }
}
</style>
