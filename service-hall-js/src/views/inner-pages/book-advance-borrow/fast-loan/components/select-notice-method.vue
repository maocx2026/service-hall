<script lang="ts">
import { defineComponent, toRef, ref, onMounted } from 'vue';
import { Field, Picker, Popup } from 'vant';

import { namespaceT } from '@/helps/namespace-t';

import { createNoticeMethodsOptions, NoticeMethods } from '../helps/data';


export default defineComponent({
  components: {
    VField: Field,
    VPicker: Picker,
    VPopup: Popup,
  },

  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },

  emits: [
    'update:modelValue',
  ],

  setup(props, { emit }) {
    const t = namespaceT('bookAdvanceBorrow.add');
    const model = toRef(props, 'modelValue');
    const showPicker = ref(false);
    const columns = ref(createNoticeMethodsOptions());

    const fieldText = ref('');

    function onShowPicker() {
      showPicker.value = true;
    }

    function onConfirm({ selectedOptions }) {
      showPicker.value = false;
      fieldText.value = selectedOptions[0].text;
      model.value = selectedOptions[0].value;
      emit('update:modelValue', selectedOptions[0].value);
    }

    onMounted(() => {
      fieldText.value = columns.value
        .filter((i) => i.value === model.value)[0]?.text;
    });

    return {
      t,
      model,
      showPicker,
      columns,
      fieldText,

      NoticeMethods,

      onShowPicker,
      onConfirm,
    };
  },
});
</script>

<template>
  <VField
    v-model="fieldText"
    name="noteType"
    required
    readonly
    class="sh-select-field"
    @click="onShowPicker"
  >
    <template #right-icon>
      <div
        class="spirte spirte-bottom-triangle-gray1"
        :class="{'rotate': showPicker}"
      />
    </template>
  </VField>
  <VPopup
    v-model:show="showPicker"
    position="bottom"
    class="sh-vant-popup-bottom"
    :close-on-click-overlay="false"
  >
    <VPicker
      :columns="columns"
      @cancel="showPicker = false"
      @confirm="onConfirm"
    />
  </VPopup>

  <div
    v-if="model === NoticeMethods.MESSAGE"
    class="tip"
  >
    <div class="spirte spirte-warning" />
    <span>
      {{ t('text.messageNoticeTip') }}
    </span>
  </div>
</template>

<style lang="less" scoped>
.tip {
  margin-top: 0.04rem;
  color: #777;
  font-weight: 400;
  font-size: 0.12rem;
  line-height: 1.5;

  >.spirte-warning {
    display: inline-block;
    margin-right: 0.04rem;
  }
}
</style>
