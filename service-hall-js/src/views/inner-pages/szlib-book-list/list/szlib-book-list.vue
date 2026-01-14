<script lang="ts">
import { defineComponent, reactive, ref, onMounted, getCurrentInstance } from 'vue';

import { namespaceT } from '@/helps/namespace-t';

import SearchInput from '@/components/business/search-input.vue';
import TopCateBtns from './components/top-cate-btns.vue';
import DescItem from './components/desc-item.vue';
import ListTitle from './components/list-title.vue';
import BookList from './components/book-list.vue';

export default defineComponent({
  components: {
    TopCateBtns,
    SearchInput,
    DescItem,
    ListTitle,
    BookList,
  },

  setup() {
    const vm = getCurrentInstance();
    const t = namespaceT('szlibBookList');
    const bookListRef = ref();
    const isExpend = ref(false);
    const isShowList = ref(false);
    const model = reactive({
      cate: '',
      keyword: '',
      year: '',
      issue: '',
    });

    function handleExpend(val) {
      isExpend.value = val;
    }

    function onSearch() {
      bookListRef.value.refresh();
    }

    function onSelectCate(code) {
      Object.assign(model, {
        cate: code,
        keyword: '',
      });
      onSearch();
    }

    onMounted(() => {
      const router = vm.proxy.$router;
      const querys = router.currentRoute.value.query;
      Object.assign(model, {
        ...querys,
      });
      isShowList.value = true;
    });

    return {
      t,
      model,
      isExpend,
      bookListRef,
      isShowList,

      handleExpend,
      onSearch,
      onSelectCate,
    };
  },
});
</script>


<template>
  <div>
    <TopCateBtns
      v-model="model"
      @toggle-expend="handleExpend"
      @change="onSelectCate"
    />

    <div
      class="book-list-content"
      :class="{'expend': isExpend}"
    >
      <SearchInput
        v-if="!model.cate"
        v-model="model.keyword"
        :placeholder="t('keyword')"
        class="search-input-item"
        @search="onSearch"
      />

      <DescItem />

      <ListTitle
        v-if="model.cate"
        v-model="model"
        @search="onSearch"
      />

      <BookList
        v-if="isShowList"
        ref="bookListRef"
        :options="model"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.book-list-content {
  position: relative;
  z-index: 1;
  min-height: 1rem;
  margin-top: -0.74rem;
  padding-top: 0.12rem;
  background-color: #f7f8ff;
  border-top-left-radius: 0.24rem;
  border-top-right-radius: 0.24rem;

  &.expend {
    margin-top: -0.24rem;
  }

  .search-input-item {
    margin: 0 0.16rem 0.12rem;
  }
}
</style>
