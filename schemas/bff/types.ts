export type Context = {
  token: string
  setCookieToken: (token: string) => void
  removeCookieToken: () => void
}
