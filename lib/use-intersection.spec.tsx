/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { DependencyInjectionProvider } from './use-dependency-injection'
import useIntersection from './use-intersection'

const Usage = () => {
  const { done, setRef } = useIntersection({ rootMargin: '-20% 0px' })

  return <div ref={setRef}>{done ? 'true' : 'false'}</div>
}

describe('useIntersection', () => {
  it('test', () => {
    const observe = jest.fn()
    const unobserve = jest.fn()
    const disconnect = jest.fn()

    let callbackFn: Function = () => {}
    let options = {}
    const IntersectionObserver = jest.fn().mockImplementation((fn, opts) => {
      callbackFn = fn
      options = opts
      return { observe, unobserve, disconnect }
    })

    const { unmount, getByText } = render(
      <DependencyInjectionProvider value={{ IntersectionObserver }}>
        <Usage />
      </DependencyInjectionProvider>,
    )

    expect(IntersectionObserver).toHaveBeenCalledTimes(1)
    expect(options).toEqual({ rootMargin: '-20% 0px' })
    expect(observe).toHaveBeenCalledTimes(1)
    expect(unobserve).toHaveBeenCalledTimes(0)
    expect(disconnect).toHaveBeenCalledTimes(0)

    const target = getByText('false')

    act(() => {
      callbackFn([{ isIntersecting: false, target }])
    })

    expect(unobserve).toHaveBeenCalledTimes(0)
    expect(disconnect).toHaveBeenCalledTimes(0)
    expect(target.textContent).toBe('false')

    act(() => {
      callbackFn([{ isIntersecting: true, target }])
    })

    expect(unobserve).toHaveBeenCalledTimes(1)
    expect(disconnect).toHaveBeenCalledTimes(0)
    expect(target.textContent).toBe('true')

    unmount()

    expect(disconnect).toHaveBeenCalledTimes(1)
  })
})
