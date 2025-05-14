<template>
  <input
    v-model="vModel"
    type="number"
    :placeholder="placeholder"
    :step="props.step"
    :min="props.min"
    :max="props.max"
    :class="componentClasses"
  >
</template>

<script setup lang="ts">
import { defineProps, defineModel, computed } from 'vue'

const vModel = defineModel()

const props = defineProps({
  step: {
    type: Number,
    default: 0.1
  },
  min: {
    type: Number,
    default: -Infinity
  },
  max: {
    type: Number,
    default: Infinity
  },
  block: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
})

// computed
const componentClasses = computed(() => {
  return {
    'number': true,
    'number--block': props.block,
  }
})

</script>

<style scoped lang="scss">
.number {
  padding: 0.4rem;
  font-size: 1rem;

  &--block {
    display: block;
    margin: auto;
  }
}
</style>