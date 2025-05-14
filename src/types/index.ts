export type TAnswers = string[]
export type TQuestionItem = {
  id: string
  question: string
  answers: TAnswers
}

export type TQuestions = {
  [key: string]: TQuestionItem
}

export type TStatisticsAnswers = {
  questionId: string;
  inputAnswers: string;
  correctAnswer: string
}