import { useEffect } from 'react'

type Param = {
  href: string
  integrity?: string
  crossOrigin?: 'anonymous'
}

const useLazyStylesheet = ({ href, integrity, crossOrigin }: Param): void => {
  useEffect(() => {
    if (!document.head.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.type = 'text/css'
      link.href = href
      if (integrity) link.integrity = integrity
      if (crossOrigin) link.crossOrigin = crossOrigin
      document.head.appendChild(link)
    }
  }, [href, integrity, crossOrigin])
}

export default useLazyStylesheet
