<script lang="ts">
import { defineComponent, ref, onUnmounted } from 'vue';
import { Button } from 'vant';

export default defineComponent({
  name: 'TimeCountDownBtn',

  components: {
    VButton: Button,
  },

  props: {
    clickFnc: {
      type: Function,
      default: () => {},
    },
  },

  setup(props) {
    const isDisabled = ref<boolean>(false);
    const remainingTime = ref<number>(60);
    const intervalId = ref<NodeJS.Timeout | null>(null);

    function startCountdown() {
      intervalId.value = setInterval(() => {
        if (remainingTime.value > 0) {
          remainingTime.value -= 1;
        } else {
          clearInterval(intervalId.value);
          intervalId.value = null;
          isDisabled.value = false;
          remainingTime.value = 60;
        }
      }, 1000);
    }

    function sendCode() {
      if (isDisabled.value) return;

      // 模拟发送验证码的操作
      props.clickFnc()
        .then(() => {
          // 禁用按钮并开始倒计时
          isDisabled.value = true;
          startCountdown();
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    onUnmounted(() => {
      if (intervalId.value) {
        clearInterval(intervalId.value);
      }
    });

    return {
      isDisabled,
      remainingTime,
      sendCode,
    };
  },
});
</script>

<template>
  <VButton
    class="checkcode-btn text-btn"
    :disabled="isDisabled"
    @click="sendCode"
  >
    <span v-if="isDisabled">
      {{ $t('personalInfo.text.resendCode', { time: remainingTime }) }}
    </span>
    <span v-else>
      {{ $t('personalInfo.text.sendCode') }}
    </span>
  </VButton>
</template>

<style lang="less">
.checkcode-btn {
  height: 0.21rem;
  padding: 0;
  border: 0;
  color: var(--primary-color);
  font-weight: 400;
  font-size: 0.12rem;
  text-align: center;
  line-height: 1.45;

  &.van-button--disabled {
    color: #bababa;
  }
}
</style>
