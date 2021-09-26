import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import '../styles/index.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const { NEXT_PUBLIC_GTAG_ID } = process.env
    if (NEXT_PUBLIC_GTAG_ID == null) return () => {}

    const handleRouteChange = (url: string) => {
      window.gtag('config', NEXT_PUBLIC_GTAG_ID, {
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
