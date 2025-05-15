<template>
  <label class="radio">
    <input v-model="vModel" type="radio" :name="props.name" :value="props.value" />
    {{ label }}
  </label>
</template>

<script setup lang="ts">
import { defineProps, defineModel } from 'vue'

const vModel = defineModel()

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
})

</script>

<style scoped lang="scss">
.radio {
  font-size: 1rem;

  @media print {
    font-size: 0.8rem;
  }
}
</style>