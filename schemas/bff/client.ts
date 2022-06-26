import { createClient, defaultExchanges, debugExchange } from 'urql'
import { bffGraphQLEndpoint } from '../../lib/constants'

export * from './client.generated'

export const client = createClient({
  url: bffGraphQLEndpoint,
  // Error: ReactDOMServer does not yet support Suspense.
  // suspense: true,
  exchanges:
    process.env.NODE_ENV === 'development'
      ? [debugExchange, ...defaultExchanges]
      : defaultExchanges,
})
