/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'
import { useEffect } from 'react'
import {
  DependencyInjectionProvider,
  useDependencyInjection,
} from './use-dependency-injection'

const Usage = () => {
  const { IntersectionObserver } = useDependencyInjection()

  useEffect(() => {
    // @ts-expect-error
    IntersectionObserver()
  }, [])

  return null
}

describe('useDependencyInjection', () => {
  it('test', () => {
    const IntersectionObserver = jest.fn().mockImplementation(() => {})

    render(<Usage />)

    expect(IntersectionObserver).toHaveBeenCalledTimes(0)

    render(
      <DependencyInjectionProvider value={{ IntersectionObserver }}>
        <Usage />
      </DependencyInjectionProvider>,
    )

    expect(IntersectionObserver).toHaveBeenCalledTimes(1)
  })
})
