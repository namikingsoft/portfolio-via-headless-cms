import { ServerResponse, IncomingMessage } from 'http'
import { webcrypto } from 'crypto'
import { serialize, parse } from 'cookie'
import { Context } from './types'
import { Resolvers } from './server.generated'
import { getVisitorByUsername, getVisitorByPassword } from '../contentful'
import { FernetLike } from '../../lib/fernetLike'
import {
  visitorTokenCookieName,
  visitorTokenMaxAgeSec,
} from '../../lib/constants'
import {
  visitorTokenSignerKey128 as signerKey,
  visitorTokenCryptoKey128 as cryptoKey,
} from '../../env'

const fernet = new FernetLike({
  signerKey,
  cryptoKey,
  // @ts-expect-error no type
  crypto: webcrypto,
})

type ContextArgument = {
  req: IncomingMessage
  res: ServerResponse
}

export const context = ({ req, res }: ContextArgument): Context => {
  const cookies = parse(req.headers.cookie ?? '')
  const tokenFromCookie = cookies[visitorTokenCookieName]
  const tokenFromHeader = req.headers.authorization?.split?.('Bearer ')?.[1]
  const token = tokenFromHeader ?? tokenFromCookie ?? ''
  const setCookieToken = (value: string) =>
    res.setHeader(
      'Set-Cookie',
      serialize(visitorTokenCookieName, value, {
        maxAge: visitorTokenMaxAgeSec * 1000,
        httpOnly: true,
        path: '/',
      }),
    )
  return { token, setCookieToken }
}

export const resolvers: Resolvers = {
  Query: {
    async visitor(parent, args, context) {
      const username = await fernet.verify(context.token)
      const visitor = await getVisitorByUsername(username)
      return visitor
    },
  },
  Mutation: {
    async authenticate(parent, args, context) {
      const visitor = await getVisitorByPassword(args.input.password)
      const token = await fernet.sign(visitor.username, visitorTokenMaxAgeSec)
      context.setCookieToken(token)
      return { token, visitor }
    },
  },
}
