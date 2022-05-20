import { ServerResponse, IncomingMessage } from 'http'
import { Context } from './types'
import { Resolvers } from './server.generated'

type ContextArgument = {
  req: IncomingMessage
  res: ServerResponse
}

export const context = ({ req, res }: ContextArgument): Context => {
  const token = req.headers.authorization?.split?.('Bearer ')?.[1] || ''
  return { token }
}

export const resolvers: Resolvers = {
  Query: {
    async visitor(parent, args, context) {
      return { identifier: 'Identifier', name: 'Name' }
    },
  },
  Mutation: {
    async authenticate(parent, args, context) {
      return {
        token: 'Token',
        visitor: { identifier: 'Identifier', name: 'Name' },
      }
    },
  },
}
