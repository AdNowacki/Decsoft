<template>
  <button @click="clickHandler" :class="componentClasses">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
import type { TButtonSize, TButtonVariants } from './enums'
export type { TButtonSize, TButtonVariants }

// events
const emit = defineEmits(['click'])

// props
const props = defineProps({
  size: {
    type: String as () => TButtonSize,
    default: 'md'
  },
  variant: {
    type: String as () => TButtonVariants,
    default: 'primary'
  },
  block: {
    type: Boolean,
    default: false
  }
})

// computed
const componentClasses = computed(() => {
  return {
    'btn': true,
    'btn--block': props.block,
    [`btn--${props.size}`]: props.size,
    [`btn--${props.variant}`]: props.variant
  }
})

// methods
const clickHandler = () => {
  emit('click')
}
</script>

<style lang="scss" scoped>
.btn {
  --btn-md-size: 1.2rem;
  --btn-primary-bg: #d8d8d8;
  --btn-primary-bg-hover: #c2bfbf;
  --btn-secondary-bg: #1f8aa5;
  --btn-secondary-bg-hover: #36a3be;
  --btn-primary-color: #3e3e3e;
  --btn-secondary-color: #3e3e3e;

  transition: all 0.2s;
  padding: 0.5rem 1rem;

  &--block {
    display: block;
    width: 100%;
  }

  &--sm {
    font-size: calc(var(--btn-md-size) * 0.9);
  }

  &--md {
    font-size: var(--btn-md-size);
  }

  &--lg {
    font-size: calc(var(--btn-md-size) * 1.1);
  }

  &--xl {
    font-size: calc(var(--btn-md-size) * 1.2);
  }

  &--primary {
    background-color: var(--btn-primary-bg);
    border: 1px solid var(--btn-primary-bg);
    color: var(--btn-primary-color);
    transition: all 0.2s;

    &:hover {
      background-color: var(--btn-primary-bg-hover);
    }
  }

  &--secondary {
    background-color: var(--btn-secondary-bg);
    border: 1px solid var(--btn-secondary-bg);
    color: var(--btn-secondary-color);

    &:hover {
      background-color: var(--btn-secondary-bg-hover);
    }
  }

  &--outline-primary {
    background-color: transparent;
    color: var(--btn-primary-bg);
    border: 1px solid var(--btn-primary-bg);
  }

  &--outline-secondary {
    background-color: transparent;
    color: var(--btn-secondary-bg);
    border: 1px solid var(--btn-secondary-bg);
  }
}
</style>