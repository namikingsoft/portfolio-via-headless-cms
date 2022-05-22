import { visitor } from './query/visitor'
import { authenticate } from './mutation/authenticate'
import { Resolvers } from '../server.generated'

export const resolvers: Resolvers = {
  Query: {
    visitor,
  },
  Mutation: {
    authenticate,
  },
}
