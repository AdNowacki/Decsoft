<template>
  <div class="page page--form">
    <header v-if="!isTestStared">
      <h3>
        Przystępujesz do krótkiego testu jednokrotnego wyboru. <br />
        Wybierz maksymalną ilość pytań i naciśnij przycisk aby rozpocząć<br />
        Na ukończenie będziesz miał {{ testDurationAsSeconds }} sekund. Po tym czasie wrócisz na tą stronę
      </h3>
      <Number v-model="maxQuestionsModel" block :min="1" :max="200" :step="1" placeholder="Ile pytań?" class="max-questions" />
      <Btn @click="startTest()" size="sm" variant="outline-secondary">Rozpocznij test</Btn>
    </header>

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
        <Btn @click="resetComponent" size="sm" variant="outline-secondary" block>Spróbuj jeszcze raz</Btn>
      </output>

      <span class="countdown">
        {{ timeLeft }} sekund
      </span>
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
import Number from '../../form/Number/Number.vue';

// composables

// refs
const isTestStared = ref<boolean>(false)
const questionsData = ref<Partial<TQuestionItem>[] | null>(null)
const answersModel = ref<Record<string, string>>({})
const correctAnswersStatistics = ref<TStatisticsAnswers[]>([])
const sendedForm = ref<boolean>(false)
const testDuration = ref<number>(TEST_DURATION)
const timer = ref<number | null>(null)
const elapsedTime = ref<number>(0)
const testId = 'test1'

// computed
const statisticInfo = computed(() => `Udzieliłeś ${correctAnswersStatistics.value.length} z ${questionsDataFiltered.value?.length} poprawnych odpowiedzi`)
const questionsDataFiltered = computed(() => questionsData.value ? questionsData.value.slice(0, maxQuestionsModel.value) : [])
const testDurationAsSeconds = computed(() => testDuration.value / 1000)
const timeLeft = computed(() => (testDuration.value - elapsedTime.value) / 1000)

const maxQuestionsModel = ref<number>(20)

// methods
const startTest = (): void => {
  loadData()
  isTestStared.value = true
  countdown()
}

const countdown = () => {
  timer.value = setInterval(() => {
    elapsedTime.value += 1000
    if (elapsedTime.value === testDuration.value) {
      clearCountdown()
      resetComponent()
      return
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
  isTestStared.value = false
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
.max-questions {
  margin: 0.6rem auto;
  width: 120px;
}

.form-actions {
  &__print {
    margin-left: 10px;
  }

  @media print {
    display: none;
  }
}

.countdown {
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