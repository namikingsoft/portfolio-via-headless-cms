import { useEffect, useState } from 'react'
import { useDependencyInjection } from './use-dependency-injection'

type Param = {
  rootMargin?: string
}

type ReturnType = {
  setRef: (elm: Element | null) => void
  done: boolean
}

const useIntersection = ({
  rootMargin = '0px 0px',
}: Param = {}): ReturnType => {
  const [element, setElement] = useState<Element | null>(null)
  const [done, setDone] = useState(false)

  const { IntersectionObserver } = useDependencyInjection()

  useEffect(() => {
    if (element) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target === element) {
              observer.unobserve(element)
              setDone(true)
            }
          })
        },
        {
          rootMargin,
        },
      )
      observer.observe(element)

      return () => {
        observer.disconnect()
      }
    }
  }, [element])

  return { done, setRef: setElement }
}

export default useIntersection
