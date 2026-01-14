<script lang="ts">
import { defineComponent, ref, reactive, getCurrentInstance } from 'vue';
import { Form, Field, Button, Checkbox } from 'vant';

import { RouterName as RN } from '@/config/router';
import { push } from '@/helps/navigation';
import { namespaceT } from '@/helps/namespace-t';
import { openToastError, openToastSuccess } from '@/helps/toast';

import BookItem from './book-item.vue';
import ChooseBookBtn from './choose-book-btn.vue';
import RulePopup from './rule-popup.vue';


export default defineComponent({
  components: {
    VForm: Form,
    VField: Field,
    VButton: Button,
    VCheckbox: Checkbox,
    BookItem,
    ChooseBookBtn,
    RulePopup,
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
    const vm = getCurrentInstance();
    const t = namespaceT('expressBookCart');
    const model = ref(props.modelValue);
    const agree = ref(false);
    const deling = ref(false);
    const showRulePopup = ref(false);

    function onSubmit(values) {
      emit('on-save', values);
    }

    const readonlyModel = reactive({
      address: t('text.addressStart'),
      express: t('text.express'),
    });

    function onDeleteBook(item) {
      try {
        deling.value = true;
        console.log('TODO:删除', item);
        openToastSuccess(t('hint.delSucc'));
        const idx = model.value.bookList.findIndex((i) => i.id === item.id);
        model.value.bookList.splice(idx, 1);
      } catch (error) {
        openToastError(error.message);
        throw error;
      } finally {
        deling.value = false;
      }
    }

    function onClickChooseBook() {
      push(vm.proxy.$router, {
        name: RN.NewBookCarList,
      });
    }

    function onClickRule() {
      showRulePopup.value = true;
    }

    function onClosePopup() {
      showRulePopup.value = false;
    }

    function onAgreeRule() {
      onClosePopup();
      agree.value = true;
    }

    return {
      t,
      model,
      readonlyModel,
      agree,
      showRulePopup,
      deling,

      onSubmit,
      onDeleteBook,
      onClickChooseBook,
      onClickRule,
      onClosePopup,
      onAgreeRule,
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
    <div class="form-block-title">
      {{ t('title.address') }}
    </div>
    <div class="form-block">
      <div class="inline-form">
        <VField
          v-model="model.name"
          name="name"
          :placeholder="t('place.name')"
          required
          class="vant-field name-field"
          :rules="[{ required: true, message: t('place.enter') }]"
        />
        <VField
          v-model="model.mobile"
          name="mobile"
          :placeholder="t('place.mobile')"
          class="vant-field mobile-field"
          :rules="[{ required: true, message: t('place.enter') }]"
        />
      </div>
      <VField
        v-model="readonlyModel.address"
        class="vant-field"
        readonly
      />
      <VField
        v-model="model.address"
        name="address"
        :placeholder="t('place.address')"
        class="vant-field"
        :rules="[{ required: true, message: t('place.enter') }]"
      />
      <VField
        v-model="readonlyModel.express"
        class="vant-field"
        readonly
      />
    </div>
    <div class="form-block-title">
      {{ t('title.myCart') }}
    </div>
    <BookItem
      v-for="item in model.bookList"
      :key="`book-cart-${item.id}`"
      :content="item"
      :deling="deling"
      @on-del="onDeleteBook(item)"
    />

    <ChooseBookBtn
      @click="onClickChooseBook"
    />

    <div class="action-block">
      <div class="full-width">
        <VCheckbox
          v-model="agree"
          class="checkbox-agree"
          shape="square"
        >
          <span class="agree-text">
            {{ t('text.agree[0]') }}
            <span
              class="link"
              @click.stop.prevent="onClickRule"
            >
              {{ t('text.agree[1]') }}
            </span>
          </span>
        </VCheckbox>
        <VButton
          block
          type="primary"
          native-type="submit"
          class="vant-primary-btn"
          :loading="saving"
          :disabled="!agree"
        >
          {{ t('text.submit') }}
        </VButton>
      </div>
    </div>
  </VForm>
  <RulePopup
    v-model="showRulePopup"
    @on-close="onClosePopup"
    @on-agree="onAgreeRule"
  />
</template>

<style lang="less" scoped>
.vant-form .vant-field :deep(.van-cell__value) {
  text-align: left;

  .van-field__control {
    text-align: left;
  }
}

.inline-form {
  position: relative;
  display: flex;

  .name-field {
    position: relative;
    width: 1.32rem;

    &::after {
      position: absolute;
      top: 50%;
      left: calc(100% - 1px);
      display: inline-block;
      width: 0.005rem;
      height: 0.16rem;
      background-color: fade(#000, 7);
      content: "";
      transform: translateY(-50%);
    }
  }

  .mobile-field {
    flex: 1;
  }

  &::after {
    position: absolute;
    bottom: 0;
    right: 0.12rem;
    left: 0.12rem;
    display: inline-block;
    height: 0.01rem;
    background-color: fade(#000, 10);
    content: "";
    transform: scaleY(.5);
  }
}

.form-block-title {
  margin-bottom: 0.08rem;
  margin-left: 0.04rem;
  color: #212121;
  font-weight: 500;
  font-size: 0.16rem;
}

.vant-form .vant-field {
  :deep(.van-field__error-message) {
    text-align: left;
  }
}
</style>
