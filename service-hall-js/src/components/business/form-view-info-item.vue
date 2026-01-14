<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
  },

  setup() {
    return {};
  },
});
</script>

<template>
  <div class="sh-form-info-view-item">
    <div class="sh-form-label">
      {{ label }}
    </div>
    <div class="sh-form-content">
      <span
        v-if="content"
        class="content"
      >
        {{ content }}
      </span>
      <span
        v-else
        class="placeholder"
      >
        {{ $t('common.placeholder.notInput') }}
      </span>
    </div>
  </div>
</template>
