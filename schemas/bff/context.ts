import { ServerResponse, IncomingMessage } from 'http'
import { serialize, parse } from 'cookie'
import { Context } from './types'
import {
  visitorTokenCookieName,
  visitorTokenMaxAgeSec,
} from '../../lib/constants'

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
  const removeCookieToken = () =>
    res.setHeader(
      'Set-Cookie',
      serialize(visitorTokenCookieName, '', {
        maxAge: 0,
        httpOnly: true,
        path: '/',
      }),
    )
  return { token, setCookieToken, removeCookieToken }
}
