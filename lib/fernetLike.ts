// Fernet-Like token using Web Crypto API
// https://github.com/fernet/spec/blob/0250c594a266036afb39aa574b88d9283810be47/Spec.md
//
// altanative using node:crypto
// https://github.com/namikingsoft/review-spa/blob/cddcc6eaf46448f2e61c8574e792021e531ddddd/modules/review-spa-cdn/lambda/fernetLike.js

const version = '1'
const separator = '-'
const cryptoAlgorism = { name: 'AES-CBC' }
const signerAlgorism = {
  name: 'HMAC',
  hash: { name: 'SHA-256' },
}
const tagLength = 128
const expiredBaseNum = 16
const ivBytesNum = 16

const encodeBase64 = (payload: Uint8Array): string =>
  btoa(String.fromCharCode.apply(null, Array.from(payload)))

const decodeBase64 = (payload: string): Uint8Array =>
  new Uint8Array(
    atob(payload)
      .split('')
      .map((c) => c.charCodeAt(0)),
  )

type Param = {
  cryptoKey: string
  signerKey: string
  randomBytes?: () => Uint8Array
  getCurrentDate?: () => Date
  crypto?: Crypto
}

export class FernetLike {
  private cryptoKey: string
  private signerKey: string
  private randomBytes: () => Uint8Array
  private getCurrentDate: () => Date
  private crypto: Crypto

  constructor({
    cryptoKey,
    signerKey,
    randomBytes = () => this.crypto.getRandomValues(new Uint8Array(ivBytesNum)),
    getCurrentDate = () => new Date(),
    crypto = window.crypto,
  }: Param) {
    this.cryptoKey = cryptoKey
    this.signerKey = signerKey
    this.randomBytes = randomBytes
    this.getCurrentDate = getCurrentDate
    this.crypto = crypto
  }

  private async createCryptoKey(): Promise<CryptoKey> {
    return this.crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(this.cryptoKey),
      cryptoAlgorism,
      true,
      ['encrypt', 'decrypt'],
    )
  }

  private async createSignerKey(): Promise<CryptoKey> {
    return this.crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(this.signerKey),
      signerAlgorism,
      true,
      ['sign', 'verify'],
    )
  }

  private async encrypt(payload: string, iv: Uint8Array): Promise<string> {
    const algorithm = {
      name: cryptoAlgorism.name,
      iv,
      tagLength,
    }
    const cryptoKey = await this.createCryptoKey()
    const buffer = await this.crypto.subtle.encrypt(
      algorithm,
      cryptoKey,
      new TextEncoder().encode(payload),
    )
    return encodeBase64(new Uint8Array(buffer))
  }

  private async decrypt(crypted: string, iv: Uint8Array): Promise<string> {
    const payload = decodeBase64(crypted)
    const algorithm = {
      name: cryptoAlgorism.name,
      iv,
      tagLength,
    }
    const cryptoKey = await this.createCryptoKey()
    const buffer = await this.crypto.subtle.decrypt(
      algorithm,
      cryptoKey,
      payload,
    )
    return new TextDecoder().decode(buffer)
  }

  private async createHmac(payload: string): Promise<string> {
    const signerKey = await this.createSignerKey()
    const buffer = await this.crypto.subtle.sign(
      signerAlgorism,
      signerKey,
      new TextEncoder().encode(payload),
    )
    return encodeBase64(new Uint8Array(buffer))
  }

  public async sign(payload: string, maxAgeSec: number) {
    const iv = this.randomBytes()
    const ivBase64 = encodeBase64(iv)
    const crypted = await this.encrypt(payload, iv)
    const expired = (
      Math.floor(this.getCurrentDate().getTime() / 1000) + maxAgeSec
    ).toString(expiredBaseNum)
    const signature = await this.createHmac(
      version + expired + ivBase64 + crypted,
    )
    return [version, expired, ivBase64, crypted, signature].join(separator)
  }

  public async verify(token: string) {
    const [header, expired, ivBase64, crypted, signature] =
      token?.split(separator) ?? []
    const hmac = await this.createHmac(
      `${header}${expired}${ivBase64}${crypted}`,
    )
    if (signature !== hmac) {
      throw new Error('Verification failure')
    }
    const expiredMsec = parseInt(expired, expiredBaseNum) * 1000
    if (expiredMsec > this.getCurrentDate().getTime()) {
      return this.decrypt(crypted, decodeBase64(ivBase64))
    }
    throw new Error('Expired token')
  }
}
