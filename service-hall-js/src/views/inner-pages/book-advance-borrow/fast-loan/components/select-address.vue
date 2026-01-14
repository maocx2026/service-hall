<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Field, Picker, Popup, RadioGroup, Radio } from 'vant';

import { namespaceT } from '@/helps/namespace-t';
import { openToastError } from '@/helps/toast';

import { FetchBookAddressSampleList } from '../helps/sample-data';

export default defineComponent({
  components: {
    VField: Field,
    VPicker: Picker,
    VPopup: Popup,
    VRadioGroup: RadioGroup,
    VRadio: Radio,
  },

  props: {
    modelValue: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {
    const t = namespaceT('bookAdvanceBorrow.add');
    const model = ref(props.modelValue);
    const showPicker = ref(false);
    const columns = ref([]);
    const serviceAddrLists = ref([]);

    function onShowPicker() {
      showPicker.value = true;
    }

    function onConfirm({ selectedOptions }) {
      showPicker.value = false;
      const { text, value, serviceaddr } = selectedOptions[0];
      Object.assign(model.value, {
        serviceAreaName: text,
        serviceArea: value,
        serviceAddr: '',
      });
      serviceAddrLists.value = (serviceaddr || []).map((item) => ({
        ...item,
        text: item.address,
        value: item.id,
      }));
    }

    function onLoadData() {
      try {
        // TODO:获取取书地点列表
        columns.value = FetchBookAddressSampleList.selfLib.map((item) => ({
          ...item,
          value: item.name,
          text: item.name,
        }));
        serviceAddrLists.value = (FetchBookAddressSampleList.selfLib[0].serviceaddr || []).map((item) => ({
          ...item,
          text: item.address,
          value: item.id,
        }));
      } catch (error) {
        openToastError(error.message);
        throw error;
      }
    }

    onMounted(() => {
      onLoadData();
    });

    return {
      t,
      model,
      showPicker,
      columns,
      serviceAddrLists,

      onShowPicker,
      onConfirm,
    };
  },
});
</script>

<template>
  <VField
    v-model="model.serviceAreaName"
    name="serviceArea"
    :placeholder="$t('common.placeholder.select')"
    class="sh-select-field"
    :rules="[{ required: true, message: t('error.bookAddress') }]"
    readonly
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
  <VField
    v-if="serviceAddrLists.length"
    v-model="model.serviceAddr"
    name="serviceAddr"
    :rules="[{ required: true, message: t('error.bookAddress') }]"
    class="no-padding-field"
  >
    <template #input>
      <VRadioGroup
        v-model="model.serviceAddr"
        class="sh-vant-radio-group"
        shape="dot"
      >
        <VRadio
          v-for="item in serviceAddrLists"
          :key="item.address"
          :name="item.address"
          class="sh-vant-radio"
        >
          {{ item.address }}
        </VRadio>
      </VRadioGroup>
    </template>
  </VField>
</template>
