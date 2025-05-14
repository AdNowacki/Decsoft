export type TAnswers = string[]
export type TQuestionItem = {
  id: string
  question: string
  answers: TAnswers
}

export type TQuestions = {
  [key: string]: TQuestionItem
}