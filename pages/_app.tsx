import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { gtagId } from '../env'
import '../styles/index.css'
import '../styles/prism.css'

export default function MyApp({ Component, pageProps }: AppProps) {
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

  return <Component {...pageProps} />
}
