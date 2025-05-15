<template>
  <header>
    <h3>
      Przystępujesz do krótkiego testu jednokrotnego wyboru. <br />
      Wybierz maksymalną ilość pytań i naciśnij przycisk aby rozpocząć<br />
      <span v-if="props.testDurationAsSeconds">
        Na ukończenie będziesz miał {{ props.testDurationAsSeconds }} sekund. Po tym czasie wrócisz na tą stronę
      </span>
    </h3>
    <Number v-model="vModel" block :min="1" :max="200" :step="1" placeholder="Ile pytań?" class="max-questions" />
    <Btn @click="clickHandler" size="sm" variant="outline-secondary">Rozpocznij test</Btn>
  </header>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

import Btn from '../../common/Btn/Btn.vue';
import Number from '../../form/Number/Number.vue';

// events
const emit = defineEmits(['click'])

// props
const props = defineProps<{
  testDurationAsSeconds?: number
}>();

const vModel = defineModel()

// methods
const clickHandler = () => emit('click')
</script>

<style lang="scss" scoped>
.max-questions {
  margin: 0.6rem auto;
  width: 120px;
}
</style>