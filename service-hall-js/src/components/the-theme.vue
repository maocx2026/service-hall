<script lang="ts">
import { defineComponent, toRef, computed, unref } from 'vue';

import { Locale } from '@/config/locale';


export default defineComponent({
  name: 'TheTheme',

  props: {
    locale: {
      type: String,
      default: Locale.ZH_CN,
    },
  },

  setup(props) {
    const locale = toRef(props, 'locale');


    function getThemeClass(currLang) {
      const classList = ['pima-theme'];
      if (currLang && Object.values(Locale).indexOf(currLang) !== -1) {
        if (currLang === Locale.EN_US) {
          classList.push('pima-chn-lang-theme');
        } else {
          classList.push('pima-eng-lang-theme');
        }
      }

      return classList;
    }

    const themeClass = computed(() => {
      return getThemeClass(unref(locale));
    });


    return {
      themeClass,
    };
  },
});
</script>

<template>
  <div :class="themeClass">
    <slot />
  </div>
</template>
