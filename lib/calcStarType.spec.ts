import { calcStarType } from './calcStarType'

test('calcStarType', () => {
  expect(calcStarType(1, 1)).toBe('half')
  expect(calcStarType(1, 2)).toBe('full')
  expect(calcStarType(1, 3)).toBe('full')
  expect(calcStarType(2, 1)).toBe('none')
  expect(calcStarType(2, 2)).toBe('none')
  expect(calcStarType(2, 3)).toBe('half')
  expect(calcStarType(2, 4)).toBe('full')
  expect(calcStarType(5, 8)).toBe('none')
  expect(calcStarType(5, 9)).toBe('half')
  expect(calcStarType(5, 10)).toBe('full')
  // @ts-expect-error rating is over
  expect(calcStarType(1, 0)).toBe('none')
  // @ts-expect-error rating is over
  expect(calcStarType(5, 11)).toBe('full')
  // @ts-expect-error position is over
  expect(calcStarType(0, 1)).toBe('full')
  // @ts-expect-error position is over
  expect(calcStarType(6, 10)).toBe('none')
})
