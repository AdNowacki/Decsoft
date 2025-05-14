import type { TQuestions, TQuestionItem } from '../types'

export const useConverter = () => {
  const questionsObjectsToMapConverter = (questions: TQuestions): Partial<TQuestionItem>[] => {
    if (!questions) return []

    return Object.values(questions).map(({ id, question, answers }) => ({ id, question, answers }))
  }

  const shuffle = <T>(inputData: T[]): T[] => {
    if (!inputData) return [];
    
    return inputData
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  return { questionsObjectsToMapConverter, shuffle }
}