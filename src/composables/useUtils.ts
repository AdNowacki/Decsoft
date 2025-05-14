import type { TQuestions, TQuestionItem } from '../types'

export const useUtils = () => {
  const questionsObjectsToArrayConverter = (questions: TQuestions): TQuestionItem[] => {
    if (!questions) return []

    return Object.values(questions)
  }

  const removeQuestionsProperty= (questions: TQuestionItem[], property: string): Partial<TQuestionItem>[] => {
    if (!questions) return []

    return questions.map((question) => {
      const { [property]: propertyToRemove, ...rest } = question as Record<string, unknown>
      return rest as Partial<TQuestionItem>
    })    
  }

  const shuffle = <T>(inputData: T[]): T[] => {
    if (!inputData) return [];
    
    return inputData
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  return { questionsObjectsToArrayConverter, shuffle, removeQuestionsProperty }
}