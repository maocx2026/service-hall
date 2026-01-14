<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { Form, Field, Button, ActionSheet } from 'vant';

import { namespaceT } from '@/helps/namespace-t';

export default defineComponent({
  components: {
    VForm: Form,
    VActionSheet: ActionSheet,
    VField: Field,
    VButton: Button,
  },

  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    saving: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'on-save',
  ],

  setup(props, { emit }) {
    const t = namespaceT('recommendPurchase.add');
    const model = ref(props.modelValue);

    const publicationPlace = reactive({
      showAction: false,
      actions: [
        { name: '中国大陆' },
        { name: '港澳台' },
        { name: '海外' },
        { name: '不详' },
      ],
    });

    const noticeMethod = reactive({
      showAction: false,
      actions: [
        { name: '自查' },
        { name: '短信通知' },
      ],
    });

    function onSubmit(values) {
      emit('on-save', values);
    }

    function onShowPublishPlacePopup() {
      publicationPlace.showAction = true;
    }

    function onPublishPlaceSelect({ name }) {
      model.value.publicationPlace = name;
    }

    function onShowNoticeMethodPopup() {
      noticeMethod.showAction = true;
    }

    function onNoticeMethodSelect({ name }) {
      model.value.noticeMethod = name;
    }

    return {
      t,
      model,
      publicationPlace,
      noticeMethod,

      onSubmit,
      onShowPublishPlacePopup,
      onPublishPlaceSelect,
      onShowNoticeMethodPopup,
      onNoticeMethodSelect,
    };
  },
});
</script>


<template>
  <VForm
    scroll-to-error
    class="vant-form"
    @submit="onSubmit"
  >
    <div class="form-block">
      <VField
        v-model="model.name"
        name="name"
        :label="t('label.name')"
        :placeholder="t('place.name')"
        required
        :rules="[{ required: true, message: t('place.name') }]"
        class="vant-field"
      />
      <VField
        v-model="model.author"
        name="author"
        :label="t('label.author')"
        :placeholder="t('place.author')"
        class="vant-field"
      />
    </div>
    <div class="form-block">
      <VField
        v-model="model.publicationPlace"
        name="publicationPlace"
        :label="t('label.publicationPlace')"
        :placeholder="$t('common.placeholder.select')"
        required
        is-link
        readonly
        class="vant-field"
        :rules="[{ required: true, message: t('place.publicationPlace') }]"
        @click="onShowPublishPlacePopup"
      />
      <VActionSheet
        v-model:show="publicationPlace.showAction"
        :actions="publicationPlace.actions"
        :cancel-text="$t('common.action.cancel')"
        close-on-click-action
        :title="t('label.publicationPlace')"
        :closeable="false"
        class="vant-action-sheet"
        @select="onPublishPlaceSelect"
      />
      <VField
        v-model="model.publisher"
        name="publisher"
        :label="t('label.publisher')"
        :placeholder="t('place.publisher')"
        class="vant-field"
      />
      <VField
        v-model="model.publicationYear"
        name="publicationYear"
        :label="t('label.publicationYear')"
        :placeholder="t('place.publicationYear')"
        class="vant-field"
      />
      <VField
        v-model="model.isbn"
        name="isbn"
        :label="t('label.isbn')"
        :placeholder="t('place.isbn')"
        class="vant-field"
      />
      <VField
        v-model="model.price"
        name="price"
        :label="t('label.price')"
        :placeholder="t('place.price')"
        class="vant-field"
      />
      <VField
        v-model="model.page"
        name="page"
        :label="t('label.page')"
        :placeholder="t('place.page')"
        class="vant-field"
      />
      <VField
        v-model="model.noticeMethod"
        name="noticeMethod"
        :label="t('label.noticeMethod')"
        :placeholder="$t('common.placeholder.select')"
        is-link
        readonly
        class="vant-field"
        @click="onShowNoticeMethodPopup"
      />
      <VActionSheet
        v-model:show="noticeMethod.showAction"
        :actions="noticeMethod.actions"
        :cancel-text="$t('common.action.cancel')"
        close-on-click-action
        :title="t('label.noticeMethod')"
        :closeable="false"
        class="vant-action-sheet"
        @select="onNoticeMethodSelect"
      />
    </div>

    <div class="tip-block">
      <div class="title">
        {{ t('tip.title') }}
      </div>

      <div class="cont">
        {{ t('tip.cont[0]') }} <br>
        {{ t('tip.cont[1]') }}
      </div>
    </div>

    <div class="action-block">
      <VButton
        block
        type="primary"
        native-type="submit"
        class="vant-primary-btn"
        :loading="saving"
      >
        {{ $t('common.action.submit') }}
      </VButton>
    </div>
  </VForm>
</template>

<style lang="less" scoped>
.tip-block {
  margin-top: 0.16rem;
  font-weight: 400;
  font-size: 0.13rem;
  line-height: 1.7;

  .title {
    color: #444;
  }

  .cont {
    margin-top: 0.06rem;
    color: #777;
  }
}
</style>
