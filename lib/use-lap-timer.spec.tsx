/**
 * @jest-environment jsdom
 */

import { render, act, fireEvent } from '@testing-library/react'
import { useState } from 'react'
import useLapTimer from './use-lap-timer'

const Usage = () => {
  const [enabled, setEnabled] = useState(false)
  const lapPassed = useLapTimer(
    {
      zero: 0,
      lap1: 1000,
      lap2: 5000,
    },
    enabled,
  )

  return (
    <>
      <dl>
        <dt>zero</dt>
        <dd>{lapPassed.zero ? 'passed' : 'yet'}</dd>
        <dt>lap1</dt>
        <dd>{lapPassed.lap1 ? 'passed' : 'yet'}</dd>
        <dt>lap2</dt>
        <dd>{lapPassed.lap2 ? 'passed' : 'yet'}</dd>
      </dl>
      <button onClick={() => setEnabled(true)}>Start</button>
    </>
  )
}

test('useLapTimer', () => {
  jest.useFakeTimers()

  const { getByText } = render(<Usage />)

  const zero = getByText('zero').nextSibling!
  const lap1 = getByText('lap1').nextSibling!
  const lap2 = getByText('lap2').nextSibling!
  const startButton = getByText('Start')

  expect(zero.textContent).toBe('yet')
  expect(lap1.textContent).toBe('yet')
  expect(lap2.textContent).toBe('yet')

  act(() => {
    jest.advanceTimersByTime(10000)
  })

  expect(zero.textContent).toBe('yet')
  expect(lap1.textContent).toBe('yet')
  expect(lap2.textContent).toBe('yet')

  fireEvent.click(startButton)

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
