import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'

type Props = {
  gtagId: string | undefined
  children: ReactNode
}

const GtagProvider = ({ gtagId, children }: Props) => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (gtagId != null)
        window.gtag('config', gtagId, {
          page_path: url,
        })
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <>{children}</>
}

export default GtagProvider
