import { NextRequest, NextResponse } from 'next/server'
import { FernetLike } from './lib/fernetLike'
import {
  redirectUriSearchParamsName,
  visitorTokenCookieName,
} from './lib/constants'
import { pagesPath } from './lib/$path'
import {
  visitorTokenSignerKey128 as signerKey,
  visitorTokenCryptoKey128 as cryptoKey,
} from './env'

const fernet = new FernetLike({ signerKey, cryptoKey, crypto })

export async function middleware(req: NextRequest) {
  try {
    const visitorToken = req.cookies.get(visitorTokenCookieName)
    if (!visitorToken) throw new Error('Visitor token not found')
    await fernet.verify(visitorToken.value)
    return NextResponse.next()
  } catch (err) {
    const url = req.nextUrl.clone()
    url.searchParams.set(redirectUriSearchParamsName, url.pathname)
    url.pathname = pagesPath.$url().pathname
    return Response.redirect(url)
  }
}

export const config = {
  matcher: ['/private/:path*'],
}
