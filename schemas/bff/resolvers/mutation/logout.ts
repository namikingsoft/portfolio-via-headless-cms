import { Resolvers } from '../../server.generated'

export const logout: NonNullable<
  NonNullable<Resolvers['Mutation']>['logout']
> = async (parent, args, context) => {
  context.removeCookieToken()
  return true
}
