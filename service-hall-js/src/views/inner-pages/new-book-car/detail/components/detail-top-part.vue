<script lang="ts">
import { defineComponent, ref } from 'vue';

import { namespaceT } from '@/helps/namespace-t';

import TopActions from './top-actions.vue';


export default defineComponent({
  components: {
    TopActions,
  },

  props: {
    modelValue: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {
    const t = namespaceT('szlibBookList.detail');
    const model = ref(props.modelValue);

    return {
      t,
      model,
    };
  },
});
</script>


<template>
  <div class="header-wrap">
    <div class="info-meta">
      <div class="cover">
        <img
          :src="model.cover"
          alt=""
        >
      </div>
      <div class="meta">
        <div class="title-box">
          {{ model.title }}
        </div>
        <div class="item">
          {{ model.author }} / {{ model.publisher }}
        </div>
        <div class="item">
          {{ t('label.price') }}：
          {{ model.price }}
        </div>
      </div>
    </div>
    <TopActions v-model="model" />
  </div>
</template>

<style lang="less" scoped>
.header-wrap {
  min-height: 2.13rem;
  padding: 0.16rem 0.2rem 0.41rem;
  color: #fff;
  background: linear-gradient(311deg, #4060d0 -3.29%, #4d6ef6 51.72%, #4162d3 104.58%);

  .info-meta {
    display: flex;

    .cover {
      width: 0.72rem;
      height: 1rem;
      margin-right: 0.14rem;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .meta {
      flex: 1;

      .title-box {
        margin: 0.04rem 0;
        font-weight: 900;
        font-size: 0.18rem;
        line-height: 1.45;
      }

      .item {
        margin-bottom: 0.07rem;
        font-weight: 400;
        font-size: 0.12rem;
      }
    }
  }
}
</style>
