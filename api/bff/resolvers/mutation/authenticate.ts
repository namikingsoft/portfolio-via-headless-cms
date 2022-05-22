import { Resolvers } from '../../server.generated'
import { getVisitorByPassword } from '../../../contentful'
import { fernet } from '../../fernet'
import { visitorTokenMaxAgeSec } from '../../../../lib/constants'

export const authenticate: NonNullable<
  NonNullable<Resolvers['Mutation']>['authenticate']
> = async (parent, args, context) => {
  const visitor = await getVisitorByPassword(args.input.password)
  const token = await fernet.sign(visitor.username, visitorTokenMaxAgeSec)
  context.setCookieToken(token)
  return { token, visitor }
}
