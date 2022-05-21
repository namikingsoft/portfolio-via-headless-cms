import { NextRequest, NextResponse } from 'next/server'
import { FernetLike } from '../../lib/fernetLike'
import {
  redirectUriSearchParamsName,
  visitorTokenCookieName,
} from '../../lib/constants'
import {
  visitorTokenSignerKey128 as signerKey,
  visitorTokenCryptoKey128 as cryptoKey,
} from '../../env'

const fernet = new FernetLike({ signerKey, cryptoKey, crypto })

export async function middleware(req: NextRequest) {
  try {
    await fernet.verify(req.cookies[visitorTokenCookieName])
    return NextResponse.next()
  } catch (err) {
    const url = req.nextUrl.clone()
    url.searchParams.set(redirectUriSearchParamsName, url.pathname)
    url.pathname = '/'
    return Response.redirect(url)
  }
}
