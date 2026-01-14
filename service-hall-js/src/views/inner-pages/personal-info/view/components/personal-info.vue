<script lang="ts">
import { defineComponent } from 'vue';

import { namespaceT } from '@/helps/namespace-t';

import FormViewInfoItem from '@/components/business/form-view-info-item.vue';


export default defineComponent({
  components: {
    FormViewInfoItem,
  },

  props: {
    model: {
      type: Object,
      default: () => {},
    },
  },

  setup() {
    const t = namespaceT('personalInfo');

    return {
      t,
    };
  },
});
</script>


<template>
  <div class="sh-form-info-view">
    <FormViewInfoItem
      :label="t('label.name')"
      :content="model.name"
    />
    <FormViewInfoItem
      :label="t('label.idCard')"
      :content="model.idCard"
    />
    <FormViewInfoItem
      :label="t('label.cardNo')"
      :content="model.cardNo"
    />
    <FormViewInfoItem
      :label="t('label.mobile')"
      :content="model.mobile"
    />
    <FormViewInfoItem
      :label="t('label.phone')"
      :content="model.phone"
    />
    <FormViewInfoItem
      :label="t('label.email')"
      :content="model.email"
    />
    <FormViewInfoItem
      :label="t('label.address')"
      :content="model.address"
    />
  </div>
</template>
