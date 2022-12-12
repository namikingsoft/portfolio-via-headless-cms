import { ReactNode, useEffect, createContext, useContext } from 'react'

type Props = {
  gtagId: string | undefined
  children: ReactNode
}

const GtagContext = createContext<string | undefined>(undefined)

export const useGtagUserId = (userId: string | undefined) => {
  const gtagId = useContext(GtagContext)

  useEffect(() => {
    if (gtagId != null && userId != null) {
      window.gtag('config', gtagId, {
        // refs. https://support.google.com/analytics/answer/9213390?hl=ja
        user_id: userId,
        // refs. https://developers.google.cn/analytics/devguides/collection/ga4/disable-page-view?hl=ja
        send_page_view: false,
      })
      window.gtag('set', 'user_properties', {
        // for aggregate metrics group by username
        username: userId,
      })
    }
  }, [gtagId, userId])
}

const GtagProvider = ({ gtagId, children }: Props) => {
  return <GtagContext.Provider value={gtagId}>{children}</GtagContext.Provider>
}

export default GtagProvider
