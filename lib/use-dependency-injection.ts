import { createContext, useContext } from 'react'

type Value = {
  IntersectionObserver?: typeof IntersectionObserver
}

// NOTE: not use on server side
const browserApiMock: any = () => {}

const initialValue = {
  IntersectionObserver:
    globalThis.window?.IntersectionObserver ?? browserApiMock,
}

const Context = createContext<Value>(initialValue)

export const DependencyInjectionProvider = Context.Provider

export const useDependencyInjection = (): Required<Value> => {
  const value = useContext(Context)

  return { ...initialValue, ...value }
}
