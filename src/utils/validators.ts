import type { TQuestionItem } from '../types'

export const isTestFormValid = (answers: Record<string, string>, questions: Partial<TQuestionItem>[] | null) => {
  return Object.keys(answers).length === questions?.length
}