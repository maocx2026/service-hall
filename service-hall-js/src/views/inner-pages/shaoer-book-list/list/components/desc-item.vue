<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const isExpend = ref(false);
    const canExpend = ref(false);

    function onExpend() {
      isExpend.value = true;
      canExpend.value = true;
    }

    function onShrink() {
      isExpend.value = false;
    }

    return {
      isExpend,
      canExpend,

      onExpend,
      onShrink,
    };
  },
});
</script>

<template>
  <div class="book-desc">
    <div :class="isExpend ? 'no-ellipsis' : 'box'">
      <div :class="isExpend ? 'box-text-no-ellipsis' : 'box-text'">
        <div class="box-inner">
          <span
            class="text-inline"
          >
            <div class="spirte spirte-szlib-book-list-desc" />
            {{ $t('szlibBookList.desc') }}
          </span>
          <span
            v-if="canExpend"
            class="put-away"
            @click="onShrink"
          >
            {{ $t('szlibBookList.btns.shrink') }}
          </span>
        </div>
      </div>
      <div
        class="box-abs"
        :style="{'display': isExpend ? 'none' : 'block'}"
      >
        <div class="box-fake-text">
          <span class="text-inline">
            <div class="spirte spirte-szlib-book-list-desc" />
            {{ $t('szlibBookList.desc') }}
          </span>
        </div>
        <div class="box-placeholder" />
        <div
          class="box-more"
          @click="onExpend"
        >
          {{ $t('szlibBookList.btns.expend') }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.book-desc {
  margin: 0 0.12rem 0.08rem;
  padding: 0.12rem;
  background-color: #fff;
  border-radius: 0.15rem;
}

.box {
  position: relative;
  max-height: 1.1rem;
  overflow: hidden;
}

.no-ellipsis {
  position: relative;
}

.box-text {
  position: relative;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  color: transparent;
  font-size: 0.4rem;
  line-height: 0;
  letter-spacing: 0;
  text-align: justify;
  text-overflow: ellipsis;
}

.box-text-no-ellipsis {
  position: relative;
  color: transparent;
  font-size: 0.13rem;
  text-align: justify;
}

.box-inner {
  display: inline;
  color: #212121;
  font-size: 0.13rem;
  line-height: 1.7;
  letter-spacing: 0;
  vertical-align: top;
}

.text-inline {
  margin-right: 10px;
  word-break: break-word;
}

.box-abs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.box-fake-text {
  float: right;
  width: 100%;
  margin-left: -60px;
  color: transparent;
  word-break: break-word;
  opacity: 0;
}

.box-placeholder {
  float: right;
  width: 40px;
  height: 1.1rem;
  opacity: 0.5;
}

.box-more {
  position: relative;
  left: 100%;
  float: right;
  width: 60px;
  height: 22px;
  line-height: 1.7;
  color: var(--primary-color);
  font-weight: 400;
  font-size: 0.13rem;
  text-align: right;
  transform: translate(-100%, -100%);
  cursor: pointer;
}

.put-away {
  color: var(--primary-color);
  cursor: pointer;
}

.spirte-szlib-book-list-desc {
  display: inline-block;
}
</style>
