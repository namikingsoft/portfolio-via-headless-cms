import { ReactNode, useEffect, createContext, useContext } from 'react'
import { useRouter } from 'next/router'

type Props = {
  gtagId: string | undefined
  children: ReactNode
}

const GtagContext = createContext<string | undefined>(undefined)

export const useGtagUserId = (userId: string | undefined) => {
  const gtagId = useContext(GtagContext)

  useEffect(() => {
    if (gtagId != null && userId != null)
      window.gtag('config', gtagId, {
        // refs. https://support.google.com/analytics/answer/9213390?hl=ja
        user_id: userId,
        // refs. https://developers.google.cn/analytics/devguides/collection/ga4/disable-page-view?hl=ja
        send_page_view: false,
      })
  }, [gtagId, userId])
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

  return <GtagContext.Provider value={gtagId}>{children}</GtagContext.Provider>
}

export default GtagProvider
