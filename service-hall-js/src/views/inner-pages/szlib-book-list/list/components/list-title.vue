<script lang="ts">
import { defineComponent, reactive, ref, toRef, onMounted, getCurrentInstance } from 'vue';
import { Popup, Picker } from 'vant';

import { namespaceT } from '@/helps/namespace-t';

export default defineComponent({
  components: {
    VPopup: Popup,
    VPicker: Picker,
  },

  props: {
    modelValue: {
      type: Object,
      default: () => {},
    },
  },

  emits: [
    'search',
  ],

  setup(props, { emit }) {
    const vm = getCurrentInstance();
    const t = namespaceT('szlibBookList');
    const model = toRef(props, 'modelValue');

    const previousIssue = reactive({
      year: '2024年',
      issue: '第2期',
    });
    const columns = ref([
      [
        { text: '2024年', value: '2024' },
        { text: '2023年', value: '2023' },
        { text: '2022年', value: '2022' },
        { text: '2020年', value: '2020' },
        { text: '2019年', value: '2019' },
        { text: '2018年', value: '2018' },
        { text: '2017年', value: '2017' },
      ],
      [
        { text: '第12期', value: '12' },
        { text: '第11期', value: '11' },
        { text: '第10期', value: '10' },
        { text: '第9期', value: '9' },
        { text: '第8期', value: '8' },
        { text: '第7期', value: '7' },
        { text: '第6期', value: '6' },
        { text: '第5期', value: '5' },
        { text: '第4期', value: '4' },
        { text: '第3期', value: '3' },
        { text: '第2期', value: '2' },
        { text: '第1期', value: '1' },
      ],
    ]);

    const showPicker = ref(false);

    function onClickChangeIssue() {
      showPicker.value = true;
    }

    function onClosePicker() {
      showPicker.value = false;
    }

    function onConfirm({ selectedOptions, selectedValues }) {
      console.log(selectedOptions, selectedValues);
      const [yearVal, issueVal] = selectedValues;
      const [year, issue] = selectedOptions;
      Object.assign(model.value, {
        year: yearVal,
        issue: issueVal,
      });
      Object.assign(previousIssue, {
        year: year.text,
        issue: issue.text,
      });
      onClosePicker();
      emit('search');
    }

    onMounted(() => {
      const router = vm.proxy.$router;
      const { year, issue } = router.currentRoute.value.query;
      const yearText = columns.value[0].filter((i) => i.value === year)[0]?.text;
      const issueText = columns.value[1].filter((i) => i.value === issue)[0]?.text;
      if (yearText) {
        Object.assign(previousIssue, {
          year: yearText,
        });
      }
      if (issueText) {
        Object.assign(previousIssue, {
          issue: issueText,
        });
      }
    });

    return {
      t,
      previousIssue,
      showPicker,
      columns,
      model,

      onClickChangeIssue,
      onClosePicker,
      onConfirm,
    };
  },
});
</script>

<template>
  <div class="list-title">
    <div class="title-issue">
      {{ previousIssue.year }} {{ previousIssue.issue }}
    </div>
    <div
      class="change-issue"
      @click="onClickChangeIssue"
    >
      {{ t('changeIssue') }}
      <div class="spirte spirte-bottom-triangle-gray" />
    </div>
  </div>
  <VPopup
    v-model:show="showPicker"
    position="bottom"
    class="sh-vant-popup-bottom"
    :close-on-click-overlay="false"
  >
    <VPicker
      :columns="columns"
      :option-height="54"
      @confirm="onConfirm"
      @cancel="onClosePicker"
    />
  </VPopup>
</template>

<style lang="less" scoped>
.list-title {
  display: flex;
  align-items: center;
  margin: 0.2rem 0 0.12rem 0.12rem;

  .title-issue {
    color: #222;
    font-weight: 600;
    font-size: 0.16rem;
    line-height: 0.22rem;
  }

  .change-issue {
    display: flex;
    align-items: center;
    gap: 0.04rem;
    margin-left: 6px;
    color: #777;
    font-weight: 400;
    font-size: 0.13rem;
    line-height: 0.18rem;
  }
}
</style>
