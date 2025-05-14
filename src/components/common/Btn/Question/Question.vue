<template>
  <fieldset
    :class="{ 'question--success': props.correct }"
    class="question"
  >
    <label class="question__label">{{ label }}</label>
    <slot></slot>
  </fieldset>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  correct: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
})

</script>

<style scoped lang="scss">
.question {
  --q-form-success-border: #4caf50;
  --q-form-success-bg: #b1e0c4;

  text-align: left;
  margin: 0.6rem;
  border-radius: 0.5rem;

  &--success {
    background-color: var(--q-form-success-bg);
    border: 1px solid var(--q-form-success-border);
  }

  &__label {
    font-size: 1.2rem;
    font-weight: bold;
  }
}
</style>