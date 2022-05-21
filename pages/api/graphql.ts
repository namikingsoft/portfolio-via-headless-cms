import { readFileSync } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import { ApolloServer } from 'apollo-server-micro'
import { context, resolvers } from '../../api/bff/server'
import { bffGraphQLEndpoint } from '../../lib/constants'

const schemaPath = `${process.cwd()}/api/bff/schema.graphql`

const typeDefs = readFileSync(schemaPath, { encoding: 'utf-8' })

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  csrfPrevention: true,
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
