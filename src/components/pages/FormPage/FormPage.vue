<template>
  <div class="page page--form">
    <div>
      
    </div>
    <header v-if="!isTestStared">
      <h1>Przystępujesz do krótkiego testu jednokrotnego wyboru. Naciśnij przycisk aby rozpocząć</h1>
      <Btn @click="startTest()" size="sm" variant="outline-secondary">Rozpocznij test</Btn>
    </header>

    <form @submit.prevent="() => null" class="q-form" v-else>
      <h2>Ponizej znajdują się losowe pytania jednokrotnego wyboru</h2>
  
      <fieldset
        :class="{ 'q-form__group--success': sendedForm && isAnswerCorrect(q.id as string) }"
        class="q-form__group"  v-for="q in questionsData"
        :key="q.id"
      >
        <label class="q-form__label-decor">{{ q.question }}</label>
  
        <div class="q-form__control">
          <label v-for="answer in q.answers" :key="answer" class="q-form__label-default">
            <input v-model="answersModel[q.id as string]" type="radio" :name="q.id" :value="answer" />
            {{ answer }}
          </label>
        </div>
      </fieldset>

      <Btn v-if="!sendedForm" @click="sendForm" size="sm" variant="outline-secondary">Wyślij</Btn>
      <output v-else>
        {{ statisticInfo }} 
      </output>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';
import { useUtils, useValidators } from '../../../composables';
import type { TQuestionItem } from '../../../types';

import Btn from '../../common/Btn/Btn.vue';

// composables
const { questionsObjectsToArrayConverter, shuffle } = useUtils()
const { isTestFormValid } = useValidators()

// refs
const isTestStared = ref<boolean>(false)
const questionsData = ref<Partial<TQuestionItem>[] | null>(null)
const answersModel = ref<Record<string, string>>({})
const correctAnswersStatistics = ref<Record<string, string>[]>([])
const sendedForm = ref<boolean>(false)

// computed
const statisticInfo = computed(() => {
  return `Udzieliłeś ${correctAnswersStatistics.value.length} z ${questionsData.value?.length} poprawnych odpowiedzi`
})

// methods
const startTest = (): void => {
  loadData()
  isTestStared.value = true
}

const loadData = async () => {
  const { default: questions } = await import("../../../data/questions.json", { assert: { type: "json" } });
  questionsData.value = shuffle(questionsObjectsToArrayConverter(questions))
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
  if (!isTestFormValid(answersModel.value, questionsData.value)) {
    alert('Nie udzieliłeś odpowiedzi na wszystkie pytania')
    return
  }

  sendedForm.value = true
  await getCorrectAnswers()
}

const isAnswerCorrect = (questionId: string): boolean => {
  return correctAnswersStatistics.value.some((item) => item.questionId === questionId)
}

const clearComponent = () => {
  isTestStared.value = false
  questionsData.value = null
  answersModel.value = {}
  correctAnswersStatistics.value = []
  sendedForm.value = false
}

onUnmounted(() => clearComponent())
</script>

<style lang="scss" scoped>
.q-form {
  --q-form-success-border: #4caf50;
  --q-form-success-bg: #b1e0c4;

  &__group {
    text-align: left;
    margin: 0.6rem;
    border-radius: 0.5rem;

    &--success {
      background-color: var(--q-form-success-bg);
      border: 1px solid var(--q-form-success-border);
    }
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