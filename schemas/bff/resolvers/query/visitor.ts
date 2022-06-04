import { Resolvers } from '../../server.generated'
import { getVisitorByUsername } from '../../../contentful'
import { fernet } from '../../fernet'

export const visitor: NonNullable<
  NonNullable<Resolvers['Query']>['visitor']
> = async (parent, args, context) => {
  const username = await fernet.verify(context.token)
  const visitor = await getVisitorByUsername(username)
  return visitor
}
