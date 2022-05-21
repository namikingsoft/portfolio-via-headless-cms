import { createClient, defaultExchanges, debugExchange } from 'urql'
import { bffGraphQLEndpoint } from '../../lib/constants'

export * from './client.generated'

export const client = createClient({
  url: bffGraphQLEndpoint,
  suspense: true,
  exchanges:
    process.env.NODE_ENV === 'development'
      ? [debugExchange, ...defaultExchanges]
      : defaultExchanges,
})
