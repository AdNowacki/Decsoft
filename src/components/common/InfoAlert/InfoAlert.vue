<template>
  <span v-if="props.content" class="info-alert">{{ props.content }}</span>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// props
const props = defineProps<{
  content?: string
}>();
</script>

<style lang="scss" scoped>
.info-alert {
  position: fixed;
  width: 110px;
  right: 20px;
  bottom: 20px;
  padding: 10px;
  z-index: 2;
  border-radius: 4px;
  border: 1px solid var(--border-color-default);
}
</style>