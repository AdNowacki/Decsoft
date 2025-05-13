// Doc: https://vitest.dev/guide/
import { expect, test } from 'vitest'

const multi = (...nums: number[]) => {
  const isNumsValid = nums.every((num) => typeof num === 'number')

  if (!nums.length) throw new RangeError('No nums')
  if (!isNumsValid) throw new TypeError('Invalid nums')
  
  return nums.reduce((acc, num) => acc * num, 1)
}

test('multiplication 2 * 4 * 1 * 3 to equal 24', () => {
  expect(multi(2, 4, 1, 3)).toBe(24)
})

test('multiplication 12 * 3 * 0 to equal 0', () => {
  expect(multi(12, 3, 0)).toBe(0)
})