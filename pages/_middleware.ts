import { NextRequest, NextResponse } from 'next/server'
import { FernetLike } from '../lib/fernetLike'
import { visitorTokenCookieName } from '../lib/constants'
import {
  visitorTokenSignerKey128 as signerKey,
  visitorTokenCryptoKey128 as cryptoKey,
} from '../env'

const fernet = new FernetLike({ signerKey, cryptoKey, crypto })

const nonAuthPathnames = ['/api/graphql']

export async function middleware(req: NextRequest) {
  if (
    nonAuthPathnames.some((pathname) => pathname === req.nextUrl.pathname) ||
    (req.cookies.visitorToken &&
      fernet.verify(req.cookies[visitorTokenCookieName]))
  ) {
    return NextResponse.next()
  }

  return new Response('Auth required', {
    status: 401,
  })
}
