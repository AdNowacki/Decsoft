<template>
  <div class="page page--form">
    <header v-if="!isTestStared">
      <h1>Przystępujesz do krótkiego testu jednokrotnego wyboru. Naciśnij przycisk aby rozpocząć</h1>
      <Btn @click="startTest()" size="sm" variant="outline-secondary">Rozpocznij test</Btn>
    </header>

    <form @submit.prevent="() => null" class="q-form" v-else>
      <h2>Ponizej znajdują się losowe pytania jednokrotnego wyboru</h2>
  
      <fieldset class="q-form__group"  v-for="q in questionsData" :key="q.id">
        <label class="q-form__label-decor">{{ q.question }}</label>
  
        <div class="q-form__control">
          <label v-for="answer in q.answers" :key="answer" class="q-form__label-default">
            <input v-model="answersModel[q.id as string]" type="radio" :name="q.id" :value="answer" />
            {{ answer }}
          </label>
        </div>
      </fieldset>

      <Btn @click="sendForm" size="sm" variant="outline-secondary">Wyślij</Btn>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUtils } from '../../../composables/useUtils';
import type { TQuestionItem } from '../../../types';

import Btn from '../../common/Btn/Btn.vue';

// composables
const { questionsObjectsToArrayConverter, shuffle } = useUtils()

// refs
const isTestStared = ref<boolean>(false)
const questionsData = ref<Partial<TQuestionItem>[] | null>(null)
const answersModel = ref<Record<string, string>>({})
const correctAnswersStatistics = ref<Record<string, string>[]>([])

// methods
const startTest = (): void => {
  loadData()
  isTestStared.value = true
}

const loadData = async () => {
  const { default: questions } = await import("../../../data/questions.json", { assert: { type: "json" } });
  questionsData.value = shuffle(questionsObjectsToArrayConverter(questions))
}

const isValidForm = async () => {
  return Object.keys(answersModel.value).length === questionsData.value?.length
}

const getCorrectAnswers = async () => {
  if (!questionsData.value) return

  const { default: answers } = await import("../../../data/answers.json", { assert: { type: "json" } });

  const correctAnswers = Object.entries(questionsData.value).reduce((acc, [_, q]) => {
    const questionId = q.id as string
    const inputAnswers = answersModel.value[questionId]
    const correctAnswer = answers[questionId as keyof typeof answers]

    if (inputAnswers === correctAnswer) {
      acc.push({ questionId, inputAnswers, correctAnswer })
    }

    return acc
  }, [] as { questionId: string; inputAnswers: string; correctAnswer: string }[]) 

  correctAnswersStatistics.value = correctAnswers
}

const sendForm = async () => {
  if (!isValidForm()) {
    alert('Nie udzieliłeś odpowiedzi na wszystkie pytania')
    return
  }

  await getCorrectAnswers()
}

</script>

<style lang="scss" scoped>
.q-form {
  &__group {
    text-align: left;
    margin: 0.6rem;
    border-radius: 0.5rem;
  }

  &__label-decor {
    font-size: 1.2rem;
    font-weight: bold;
  }

  &__label-default {
    font-size: 1rem;
  }
}
</style>