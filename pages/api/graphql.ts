import { readFileSync } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import { ApolloServer } from 'apollo-server-micro'
import { PluginDefinition } from 'apollo-server-core'
import {
  constraintDirective,
  constraintDirectiveTypeDefs,
} from 'graphql-constraint-directive'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { context } from '../../schemas/bff/context'
import { resolvers } from '../../schemas/bff/resolvers'
import { formatError } from '../../schemas/bff/errors'
import { bffGraphQLEndpoint } from '../../lib/constants'

const schemaPath = `${process.cwd()}/schemas/bff/schema.graphql`

const typeDefs = readFileSync(schemaPath, { encoding: 'utf-8' })

const schema = constraintDirective()(
  makeExecutableSchema({
    typeDefs: [constraintDirectiveTypeDefs, typeDefs],
    resolvers,
  }),
)

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
  schema,
  context,
  formatError,
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
