import { expect, test } from 'vitest'

export function genNumber (min: number, max: number): number[] {
  const result = []
  for (let i = min; i <= max; i++) {
    result.push(i)
  }
  return result
}

// 常规的写法，我们需要这样
test('hello vitest', () => {
  expect(genNumber(1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})
