import { readFileSync } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import { ApolloServer } from 'apollo-server-micro'
import { PluginDefinition } from 'apollo-server-core'
import { context } from '../../bff/context'
import { resolvers } from '../../bff/resolvers'
import { bffGraphQLEndpoint } from '../../lib/constants'

const schemaPath = `${process.cwd()}/bff/schema.graphql`

const typeDefs = readFileSync(schemaPath, { encoding: 'utf-8' })

const setHttpPlugin: PluginDefinition = {
  async requestDidStart() {
    return {
      async willSendResponse({ response }) {
        if (response.http && response?.errors) {
          response.http.status = 400
        }
      },
    }
  },
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  csrfPrevention: true,
  plugins: [setHttpPlugin],
})

const startServer = apolloServer.start()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await startServer
  await apolloServer.createHandler({
    path: bffGraphQLEndpoint,
  })(req, res)
}

export const config = {
  api: {
    bodyParser: false,
  },
}
