<script lang="ts">
import { defineComponent, toRef, ref } from 'vue';
import { Popup, Picker } from 'vant';

import { namespaceT } from '@/helps/namespace-t';

export default defineComponent({
  components: {
    VPopup: Popup,
    VPicker: Picker,
  },

  props: {
    model: {
      type: Object,
      default: () => {},
    },

    modelValue: {
      type: Boolean,
      default: false,
    },

    active: {
      type: Boolean,
      default: false,
    },

    options: {
      type: Array,
      default: () => [],
    },
  },

  emits: [
    'on-search',
    'update:modelValue',
    'update:active',
  ],

  setup(props, { emit }) {
    const t = namespaceT('bookAdvanceBorrow.list');
    const show = toRef(props, 'modelValue');
    const queryModel = ref(props.model);
    const pickModel = ref([queryModel.value.library]);

    function onClosePicker() {
      emit('update:modelValue', false);
    }

    function onConfirm({ selectedValues }) {
      const [valu] = selectedValues;
      Object.assign(queryModel.value, {
        library: valu,
      });
      onClosePicker();
      emit('on-search');
      emit('update:active', !!valu);
    }

    return {
      t,
      show,
      queryModel,
      pickModel,

      onClosePicker,
      onConfirm,
    };
  },
});
</script>

<template>
  <VPopup
    v-model:show="show"
    position="bottom"
    class="sh-vant-popup-bottom"
    :close-on-click-overlay="false"
  >
    <VPicker
      v-model="pickModel"
      :columns="options"
      :option-height="54"
      :title="t('label.library')"
      @confirm="onConfirm"
      @cancel="onClosePicker"
    />
  </VPopup>
</template>
