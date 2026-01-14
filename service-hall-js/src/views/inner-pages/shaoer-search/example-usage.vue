<template>
  <div class="example-container">
    <h2>筛选器功能演示</h2>
    
    <!-- 筛选按钮 -->
    <button @click="showFilter = true" class="filter-btn">
      打开筛选器
    </button>
    
    <!-- 当前筛选状态显示 -->
    <div class="filter-status" v-if="hasActiveFilters">
      <h3>当前筛选条件：</h3>
      <div class="filter-items">
        <div v-if="queryModel.v_secondquery">
          <strong>筛选查询：</strong> {{ queryModel.v_secondquery }}
        </div>
      </div>
    </div>
    
    <!-- 筛选器弹窗 -->
    <FilterPopup
      v-model="showFilter"
      :model="queryModel"
      :dataSource="filterDataSource"
      :active="hasActiveFilters"
      @on-search="handleSearch"
      @update:active="handleActiveChange"
    />
  </div>
</template>

<script>
import { reactive, ref, computed, onMounted } from 'vue';
import FilterPopup from './filter-popup-new.vue';
import { createClassFromTheme } from './helps/data';

export default {
  components: {
    FilterPopup,
  },
  setup() {
    const showFilter = ref(false);
    const queryModel = reactive({
      v_secondquery: '',
    });
    
    const filterDataSource = reactive({
      age: [],
      class1: [],
      class2: [],
    });
    
    const hasActiveFilters = computed(() => {
      return !!queryModel.v_secondquery;
    });
    
    const handleSearch = () => {
      console.log('执行搜索，筛选条件：', queryModel.v_secondquery);
      showFilter.value = false;
    };
    
    const handleActiveChange = (active) => {
      console.log('筛选器激活状态：', active);
    };
    
    onMounted(async () => {
      try {
        // 加载一级分类和二级分类数据
        const classData = await createClassFromTheme();
        filterDataSource.class1 = classData.class1;
        filterDataSource.class2 = classData.class2;
        
        // 加载年龄选项（示例数据）
        filterDataSource.age = [
          { title: '0-3岁', value: '0-3' },
          { title: '3-6岁', value: '3-6' },
          { title: '6-9岁', value: '6-9' },
          { title: '9-12岁', value: '9-12' },
          { title: '12岁以上', value: '12+' },
        ];
        
        console.log('筛选器数据加载完成');
      } catch (error) {
        console.error('加载筛选器数据失败：', error);
      }
    });
    
    return {
      showFilter,
      queryModel,
      filterDataSource,
      hasActiveFilters,
      handleSearch,
      handleActiveChange,
    };
  },
};
</script>

<style scoped>
.example-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.filter-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
}

.filter-btn:hover {
  background: #0056b3;
}

.filter-status {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-top: 20px;
}

.filter-status h3 {
  margin-top: 0;
  color: #333;
}

.filter-items {
  margin-top: 10px;
}

.filter-items > div {
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}

.filter-items > div:last-child {
  border-bottom: none;
}
</style>