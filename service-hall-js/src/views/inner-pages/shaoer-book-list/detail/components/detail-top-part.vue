<script lang="ts">
import { defineComponent, ref, getCurrentInstance, computed } from 'vue';
import _ from 'lodash';

import { RouterName as RN } from '@/config/router';
import { push } from '@/helps/navigation';
import { namespaceT } from '@/helps/namespace-t';
import { openToastError } from '@/helps/toast';
import { openFavouriteDialog } from '@/helps/dialog';

import BookRate from './book-rate.vue';
import TopActions from './top-actions.vue';


export default defineComponent({
  components: {
    BookRate,
    TopActions,
  },

  props: {
    modelValue: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {
    const vm = getCurrentInstance();
    const router = vm.proxy.$router;
    const t = namespaceT('szlibBookList.detail');
    const model = ref(props.modelValue);

    function onClickFavourite() {
      if (model.value.isFavourite) {
        openFavouriteDialog(t('hint.hasFavourite'));
        return;
      }
      try {
        // TODO:点赞逻辑
        Object.assign(model.value, {
          isFavourite: true,
          favouriteNum: model.value.favouriteNum + 1,
        });
        openFavouriteDialog(t('hint.favouriteSucc'));
      } catch (error) {
        openToastError(error.message);
        throw error;
      }
    }
/*
    const showBookListLink = computed(() => {
      const showRouters = [
        RN.MyCollection,
      ] as string[];
      const fromRouteName = _.get(router.currentRoute.value, 'query.from', '');
      return showRouters.includes(fromRouteName);
    });

*/
    const showBookListLink = computed(() => {
      const showRouters = [RN.MyCollection] as string[];
      // 把数组或 undefined 都转成字符串
      const fromRouteName = String(_.get(router.currentRoute.value, 'query.from', ''));
      return showRouters.includes(fromRouteName);
    });




    const bookLinkText = computed(() => {
      const { cateText, year, issue } = model.value.booklistInfo;
      return t('listLink', {
        cate: cateText,
        year,
        issue: String(issue).padStart(2, '0'),
      });
    });

    function onClickBookListLink() {
      push(vm.proxy.$router, {
        name: RN.SzlibBookList,
        query: {
          ...model.value.booklistInfo,
        },
      });
    }

    return {
      t,
      model,

      showBookListLink,
      bookLinkText,
      RN,

      onClickFavourite,
      onClickBookListLink,
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
          <div
            class="is-like"
            @click="onClickFavourite"
          >
            <div
              v-if="model.isFavourite"
              class="spirte spirte-likes1"
            />
            <div
              v-else
              class="spirte spirte-likes"
            />

            <div>
              {{ model.favouriteNum }}
            </div>
          </div>
        </div>
        <div class="author">
          {{ model.author }}
        </div>
        <BookRate :model="model.rate" />
        <div
          v-if="showBookListLink"
          class="book-list-link"
          @click="onClickBookListLink"
        >
          {{ bookLinkText }}
          <div class="spirte spirte-right-arrow2" />
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
        display: flex;
        gap: 0.14rem;
        align-items: center;
        margin: 0.04rem 0;
        font-weight: 900;
        font-size: 0.18rem;
        line-height: 1.45;

        .is-like {
          display: flex;
          gap: 0.03rem;
          align-items: center;
          height: 0.19rem;
          padding: 0 0.06rem;
          font-weight: 400;
          font-size: 0.11rem;
          line-height: 0.19rem;
          border-radius: 0.1rem;
          background-color: fade(#fff, 10);
        }
      }

      .author {
        margin-bottom: 0.07rem;
        font-weight: 400;
        font-size: 0.12rem;
      }

      .book-list-link {
        display: flex;
        align-items: center;
        gap: 0.06rem;
        margin-top: 0.07rem;
        font-weight: 400;
        font-size: 0.12rem;
        cursor: pointer;
      }
    }
  }
}
</style>
