<template>
  <div class="page page--form">
    <FormHeader
      v-if="!isTestStarted"
      v-model="maxQuestionsModel"
      :test-duration-as-seconds="testDurationAsSeconds"
      @click="startTest()" 
    />
    <form @submit.prevent="() => null" class="q-form" v-else>
      <h2>Ponizej znajdują się losowe pytania jednokrotnego wyboru</h2>

      <Question
        v-for="q in questionsDataFiltered" 
        :key="q.id" 
        :label="q.question"
        :correct="sendedForm && isAnswerCorrect(q.id as string)"
        :incorrect="sendedForm && !isAnswerCorrect(q.id as string)"
      >
        <div class="q-form__control">
          <Radio
            v-model="answersModel[q.id as string]"
            v-for="answer in q.answers"
            :key="answer"
            :label="answer"
            :value="answer"
            :name="q.id" 
          />
        </div>
      </Question>

      <div v-if="!sendedForm" class="form-actions">
        <Btn @click="sendForm" size="sm" variant="outline-secondary">Wyślij</Btn>
        <Btn @click="printForm" size="sm" variant="outline-secondary" class="form-actions__print">Wydrukuj</Btn>
      </div>
      <output v-else>
        {{ statisticInfo }} 
        <Btn @click="resetComponent" size="sm" variant="outline-secondary" block>{{ resetButtonLabel }}</Btn>
      </output>
      <InfoAlert v-if="!sendedForm" :content="timeLeft" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';
import { isTestFormValid, questionsObjectsToArrayConverter, shuffle } from '../../../utils'
import type { TQuestionItem, TStatisticsAnswers } from '../../../types';
import { TEST_DURATION } from '../../../constants'

import Btn from '../../common/Btn/Btn.vue';
import Question from '../../common/Btn/Question/Question.vue';
import Radio from '../../form/Radio/Radio.vue';
import FormHeader from '../../form/FormHeader/FormHeader.vue';
import InfoAlert from '../../common/InfoAlert/InfoAlert.vue';

// refs
const isTestStarted = ref<boolean>(false)
const questionsData = ref<TQuestionItem[] | null>(null)
const answersModel = ref<Record<string, string>>({})
const correctAnswersStatistics = ref<TStatisticsAnswers[]>([])
const sendedForm = ref<boolean>(false)
const testDuration = ref<number>(TEST_DURATION)
const timer = ref<number | null>(null)
const elapsedTime = ref<number>(0)
const maxQuestionsModel = ref<number>(20)
const testId = 'test1'

// computed
const allAnswersCorect = computed(() => correctAnswersStatistics.value.length === questionsDataFiltered.value?.length)
const statisticInfo = computed(() => {
  return allAnswersCorect ? 'Brawo! Na wszystkie pytania odpowiedziałeś poprawnie' : `Udzieliłeś ${correctAnswersStatistics.value.length} z ${questionsDataFiltered.value?.length} poprawnych odpowiedzi`
})
const resetButtonLabel = computed(() => allAnswersCorect ? 'Wróć na stronę główną' : 'Spróbuj jeszcze raz')
const questionsDataFiltered = computed(() => questionsData.value ? questionsData.value.slice(0, maxQuestionsModel.value) : [])
const testDurationAsSeconds = computed(() => testDuration.value / 1000)
const timeLeft = computed(() => `${(testDuration.value - elapsedTime.value) / 1000} sekund`)

// methods
const startTest = () => {
  loadData()
  isTestStarted.value = true
  countdown()
}

const countdown = () => {
  timer.value = setInterval(() => {
    elapsedTime.value += 1000
    if (elapsedTime.value === testDuration.value) {
      clearCountdown()
      resetComponent()
    }
  }, 1000)
}

const clearCountdown = () => clearInterval(timer.value as number)

const loadData = async () => {
  const { default: tests } = await import("../../../data/questions.json", { assert: { type: "json" } });
  // @TODO - na tę chwilę id testu jest zahardcodowane, docelowo byłoby brane z query url, np. test=test1
  const questions = tests[testId]
  questionsData.value = shuffle(questionsObjectsToArrayConverter(questions))
}

const getCorrectAnswers = async () => {
  if (!questionsDataFiltered.value) return

  const { default: tests } = await import("../../../data/answers.json", { assert: { type: "json" } });
  // @TODO - na tę chwilę id testu jest zahardcodowane, docelowo byłoby brane z query url, np. test=test1
  const answers = tests[testId]
  const correctAnswers = Object.entries(questionsDataFiltered.value).reduce((acc, [_, q]) => {
    const questionId = q.id as string
    const inputAnswers = answersModel.value[questionId]
    const correctAnswer = answers[questionId as keyof typeof answers]

    if (inputAnswers === correctAnswer) {
      acc.push({ questionId, inputAnswers, correctAnswer })
    }

    return acc
  }, [] as TStatisticsAnswers[]) 

  correctAnswersStatistics.value = correctAnswers
}

const sendForm = async () => {
  if (!isTestFormValid(answersModel.value, questionsDataFiltered.value)) {
    alert('Nie udzieliłeś odpowiedzi na wszystkie pytania')
    return
  }

  sendedForm.value = true
  clearCountdown()
  await getCorrectAnswers()
}

const printForm = () => window.print();

const isAnswerCorrect = (questionId: string): boolean => {
  return correctAnswersStatistics.value.some((item: TStatisticsAnswers) => item.questionId === questionId)
}

const resetComponent = () => {
  isTestStarted.value = false
  questionsData.value = null
  answersModel.value = {}
  correctAnswersStatistics.value = []
  sendedForm.value = false
  maxQuestionsModel.value = 20
  elapsedTime.value = 0
  clearCountdown()
}

onUnmounted(() => resetComponent())
</script>

<style lang="scss" scoped>
.form-actions {
  &__print {
    margin-left: 10px;
  }

  @media print {
    display: none;
  }
}
</style>