import { useRouter } from 'next/router'
import { useRef, useCallback, useEffect, FormEvent, useState } from 'react'
import Container from '../components/container'
import SiteTitle from '../components/site-title'
import Layout from '../components/layout'
import Head from 'next/head'
import { useAuthenticateMutation } from '../bff/client'
import { CMS_NAME, redirectUriSearchParamsName } from '../lib/constants'
import { pagesPath } from '../lib/$path'

const Index = () => {
  const router = useRouter()
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const [error, setError] = useState('')
  const [redirecting, setRedirecting] = useState(false)

  const [result, authenticate] = useAuthenticateMutation()

  const disabled = result.fetching || redirecting

  const onSubmit = useCallback(
    async (event?: FormEvent) => {
      event?.preventDefault()

      const result = await authenticate({
        password: passwordRef.current?.value ?? '',
      })
      if (result.error) {
        return setError('Wrong password')
      }
      setRedirecting(true)
      const searchParams = new URLSearchParams(location.search)
      const redirectUri = searchParams.get(redirectUriSearchParamsName)
      router.push(
        redirectUri?.startsWith(pagesPath.private.$url().pathname)
          ? redirectUri
          : pagesPath.private.$url().pathname,
      )
    },
    [router],
  )

  const onChange = useCallback(() => {
    setError('')
    const value = passwordRef.current?.value
    if (value && value.length >= 32) onSubmit()
  }, [])

  const onFocus = useCallback(() => {
    const passwordElm = passwordRef.current
    if (passwordElm) {
      passwordElm.setSelectionRange(0, passwordElm.value.length)
    }
  }, [])

  useEffect(() => {
    passwordRef.current?.focus()
  }, [])

  return (
    <Layout>
      <Head>
        <title>Next.js Blog Example with {CMS_NAME}</title>
      </Head>
      <Container>
        <SiteTitle />
        <form className="max-w-2xl mx-auto" onSubmit={onSubmit}>
          <div className="flex border-b border-teal-500 py-2">
            <input
              ref={passwordRef}
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="password"
              placeholder="Paste password"
              aria-label="Password"
              onChange={onChange}
              onFocus={onFocus}
              disabled={disabled}
            />
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400"
              type="submit"
              disabled={disabled}
            >
              Login
            </button>
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </form>
      </Container>
    </Layout>
  )
}

export default Index
