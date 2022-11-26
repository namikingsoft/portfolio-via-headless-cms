/**
 * @jest-environment jsdom
 */

import { render, act } from '@testing-library/react'
import useLapTimer from './use-lap-timer'

const Usage = () => {
  const lapPassed = useLapTimer({
    zero: 0,
    lap1: 1000,
    lap2: 5000,
  })

  return (
    <dl>
      <dt>zero</dt>
      <dd>{lapPassed.zero ? 'passed' : 'yet'}</dd>
      <dt>lap1</dt>
      <dd>{lapPassed.lap1 ? 'passed' : 'yet'}</dd>
      <dt>lap2</dt>
      <dd>{lapPassed.lap2 ? 'passed' : 'yet'}</dd>
    </dl>
  )
}

test('useLapTimer', () => {
  jest.useFakeTimers()

  const { getByText } = render(<Usage />)

  const zero = getByText('zero').nextSibling!
  const lap1 = getByText('lap1').nextSibling!
  const lap2 = getByText('lap2').nextSibling!

  expect(zero.textContent).toBe('yet')
  expect(lap1.textContent).toBe('yet')
  expect(lap2.textContent).toBe('yet')

  act(() => {
    jest.advanceTimersByTime(0)
  })

  expect(zero.textContent).toBe('passed')
  expect(lap1.textContent).toBe('yet')
  expect(lap2.textContent).toBe('yet')

  act(() => {
    jest.advanceTimersByTime(1000)
  })

  expect(zero.textContent).toBe('passed')
  expect(lap1.textContent).toBe('passed')
  expect(lap2.textContent).toBe('yet')

  act(() => {
    jest.advanceTimersByTime(3999)
  })

  expect(zero.textContent).toBe('passed')
  expect(lap1.textContent).toBe('passed')
  expect(lap2.textContent).toBe('yet')

  act(() => {
    jest.advanceTimersByTime(1)
  })

  expect(zero.textContent).toBe('passed')
  expect(lap1.textContent).toBe('passed')
  expect(lap2.textContent).toBe('passed')
})
