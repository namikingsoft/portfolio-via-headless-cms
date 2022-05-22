import { webcrypto } from 'crypto'
import { FernetLike } from '../lib/fernetLike'
import {
  visitorTokenSignerKey128 as signerKey,
  visitorTokenCryptoKey128 as cryptoKey,
} from '../env'

export const fernet = new FernetLike({
  signerKey,
  cryptoKey,
  // @ts-expect-error no type
  crypto: webcrypto,
})
