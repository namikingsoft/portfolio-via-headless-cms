import { webcrypto } from 'crypto'
import { FernetLike } from './fernetLike'

const signerKey = '16bytesaaaaaaaaa'
const cryptoKey = '16bytesbbbbbbbbb'
const iv = new TextEncoder().encode('16bytesccccccccc')
const unixtime = 1580000000 * 1000

const fernet = new FernetLike({
  signerKey,
  cryptoKey,
  randomBytes: () => iv,
  getCurrentDate: () => new Date(unixtime),
  // @ts-expect-error Web Crypto API for DI
  crypto: webcrypto,
})

const fernetExpired = new FernetLike({
  signerKey,
  cryptoKey,
  randomBytes: () => iv,
  getCurrentDate: () => new Date(unixtime + 61 * 1000),
  // @ts-expect-error Web Crypto API for DI
  crypto: webcrypto,
})

test('sign', async () => {
  const token = await fernet.sign('I want to encrypt this string.', 60)
  expect(token).toBe(
    '1-5e2ce33c-MTZieXRlc2NjY2NjY2NjYw==-d+7GOFT9EyCqnKQOQghiczXQAZY29RvdJyi+5gnmR3U=-22v7OypcYx0N9kS3WQ6wI0X1Y73JDOOn3DXIUldU/j8=',
  )
})

test('verify ok', async () => {
  const payload = await fernet.verify(
    '1-5e2ce33c-MTZieXRlc2NjY2NjY2NjYw==-d+7GOFT9EyCqnKQOQghiczXQAZY29RvdJyi+5gnmR3U=-22v7OypcYx0N9kS3WQ6wI0X1Y73JDOOn3DXIUldU/j8=',
  )
  expect(payload).toBe('I want to encrypt this string.')
})

test('verify expired', async () => {
  const result = fernetExpired.verify(
    '1-5e2ce33c-MTZieXRlc2NjY2NjY2NjYw==-d+7GOFT9EyCqnKQOQghiczXQAZY29RvdJyi+5gnmR3U=-22v7OypcYx0N9kS3WQ6wI0X1Y73JDOOn3DXIUldU/j8=',
  )
  await expect(result).rejects.toThrow('Expired token')
})

test('verify failure', async () => {
  const result = fernet.verify(
    '1-ffffffff-MTZieXRlc2NjY2NjY2NjYw==-d+7GOFT9EyCqnKQOQghiczXQAZY29RvdJyi+5gnmR3U=-22v7OypcYx0N9kS3WQ6wI0X1Y73JDOOn3DXIUldU/j8=',
  )
  await expect(result).rejects.toThrow('Verification failure')
  await expect(fernet.verify('')).rejects.toThrow('Verification failure')
  await expect(fernet.verify('-')).rejects.toThrow('Verification failure')
  await expect(fernet.verify('-0')).rejects.toThrow('Verification failure')
  await expect(fernet.verify('----')).rejects.toThrow('Verification failure')
  // @ts-expect-error wrong arg type
  await expect(fernet.verify()).rejects.toThrow('Verification failure')
  // @ts-expect-error wrong arg type
  await expect(fernet.verify(null)).rejects.toThrow('Verification failure')
  // @ts-expect-error wrong arg type
  await expect(fernet.verify(undefined)).rejects.toThrow('Verification failure')
})
