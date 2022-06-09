import { AppProps } from 'next/app'
import { Provider } from 'urql'
import { client } from '../schemas/bff/client'
import { gtagId } from '../env'
import GtagProvider from '../components/gtag-provider'
import Layout from '../components/layout'
import Meta from '../components/meta'
import '../styles/index.css'
import '../styles/prism.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <GtagProvider gtagId={gtagId}>
        <Layout>
          <Meta />
          <Component {...pageProps} />
        </Layout>
      </GtagProvider>
    </Provider>
  )
}
