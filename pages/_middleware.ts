import { NextRequest, NextResponse } from 'next/server'
import { getVisitorByBasicAuth } from '../api/contentful'
import { FernetLike } from '../lib/fernetLike'
import {
  visitorTokenSignerKey128 as signerKey,
  visitorTokenCryptoKey128 as cryptoKey,
} from '../env'

const fernet = new FernetLike({ signerKey, cryptoKey, crypto })
const tokenMaxAgeSec = 24 * 60 * 60

const nonAuthPathnames = ['/api/graphql']

export async function middleware(req: NextRequest) {
  if (
    nonAuthPathnames.some((pathname) => pathname === req.nextUrl.pathname) ||
    (req.cookies.visitorToken && fernet.verify(req.cookies.visitorToken))
  ) {
    return NextResponse.next()
  }

  const basicAuth = req.headers.get('authorization')

  if (basicAuth) {
    const auth = basicAuth.split(' ')[1]
    const [username, password] = Buffer.from(auth, 'base64')
      .toString()
      .split(':')

    try {
      const visitor = await getVisitorByBasicAuth(username, password)

      if (!visitor.disabled) {
        const token = await fernet.sign(username, tokenMaxAgeSec)
        return NextResponse.next().cookie('visitorToken', token, {
          maxAge: tokenMaxAgeSec * 1000,
          httpOnly: true,
          path: '/',
        })
      }
      console.log('Disabled username: %s', username)
    } catch (err) {
      if (err instanceof Error && err.message.includes('nullable')) {
        console.log('Login failed username: %s', username)
      } else {
        console.error(err)
      }
    }
  }

  return new Response('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}
