import type { TQuestions, TQuestionItem } from '../types'

export const useUtils = () => {
  const questionsObjectsToArrayConverter = (questions: TQuestions): TQuestionItem[] => {
    if (!questions) return []

    return Object.values(questions)
  }

  const shuffle = <T>(inputData: T[]): T[] => {
    if (!inputData) return [];
    
    return inputData
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  return { questionsObjectsToArrayConverter, shuffle }
}