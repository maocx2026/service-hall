<script lang="ts">
import { defineComponent, ref, reactive, onMounted,getCurrentInstance,computed } from 'vue';

import { openToastError } from '@/helps/toast';

import LoadingComp from '@/components/common/loading-comp.vue';
import DetailTopPart from './components/detail-top-part.vue';
import ContentPart from './components/content-part.vue';

import { createBookDetailModel } from './helps/data';
import { SampleData } from './helps/sample-data';
import { getBookDetail_Search } from '@/api/appdic';
import * as vm from "vm";
import {props} from "~/vant/es/rolling-text/RollingTextItem";

export default defineComponent({
  components: {
    LoadingComp,
    DetailTopPart,
    ContentPart,
  },

  setup() {
    const loading = ref(false);
    const model = reactive(createBookDetailModel());
    const vm = getCurrentInstance();


    function onLoaddata() {
      const route = vm.proxy.$route;
      console.log(11)
      const metaid = route.params.id;
      console.log(metaid)

      if (!metaid) {
        openToastError('缺少图书 ID');
        return;
      }

      loading.value = true;

      getBookDetail_Search(metaid as string).then(res => {
          const data = res.data;
          if (data) {
            Object.assign(model, {
              title: data.title,
              author: data.author,
              publisher: data.publisher,
              cover: data.cover,
              contentSummary: data.abstract, // 注意接口字段拼写
              isbn: data.isbn,
              series: data.series,
              classno: data.classno,
              lang: data.lang,
              additionSummary: data.note,
              price:data.price,
              subject:data.subject,
              content_tag:data.label_info.content_tag||'-',
              all_themes:data.label_info.all_themes,
              final_theme:data.label_info.final_theme,
              age:data.label_info.age,
              color:data.label_info.color,
              fenlei_type:data.label_info.fenlei_type,
              shelf:data.label_info.shelf,
              ai_comment:data.label_info.ai_comment,
            });
          } else {
            openToastError('图书详情为空');
          }
        })
        .catch(err => {
          openToastError(err.message || '获取图书详情失败');
        })
        .finally(() => {
          loading.value = false;
        });
    }

    onMounted(() => {
      onLoaddata();
    });

    return {
      loading,
      model,

      onLoaddata,
    };
  },
});
</script>


<template>
  <LoadingComp v-if="loading" />
  <template v-else>
    <DetailTopPart v-model="model" />

    <ContentPart v-model="model" />
  </template>
</template>
