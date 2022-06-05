import Link from 'next/link'
import { ReactNode, useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { useLogoutMutation } from '../schemas/bff/client'
import { siteName, siteDescription } from '../lib/constants'
import { pagesPath } from '../lib/$path'
import Footer from './footer'
import Meta from './meta'
import Container from './container'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  const router = useRouter()

  const pageType = useMemo(() => {
    if (router.pathname === pagesPath.$url().pathname) return 'login'
    if (router.pathname === pagesPath.private.$url().pathname) return 'top'
    return 'lower'
  }, [router.pathname])

  const [, logout] = useLogoutMutation()

  const [isLogout, setIsLogout] = useState(false)

  const onClickLogout = useCallback(async () => {
    try {
      setIsLogout(true)
      if (await logout()) {
        router.push(pagesPath.$url().pathname)
      }
    } finally {
      setIsLogout(false)
    }
  }, [])

  return (
    <>
      <Meta />
      <div
        className={cn({
          'flex flex-col justify-center min-h-screen': pageType === 'login',
        })}
      >
        <Container
          className={cn({
            'max-w-2xl mx-auto': pageType === 'login',
          })}
        >
          <section
            className={cn({
              'text-center': pageType === 'login',
              'flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12':
                pageType === 'top',
              'flex flex-row mb-20 mt-8': pageType === 'lower',
            })}
          >
            <div
              className={cn({
                'text-6xl md:text-8xl font-bold tracking-tighter leading-tight':
                  pageType === 'login',
                'text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 grow':
                  pageType === 'top',
                'text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight grow':
                  pageType === 'lower',
              })}
            >
              <h1>
                {pageType === 'lower' ? (
                  <Link href={pagesPath.private.$url()}>
                    <a className="hover">{siteName}</a>
                  </Link>
                ) : (
                  siteName
                )}
              </h1>
            </div>
            <h4
              className={cn({
                'text-lg mt-5': pageType === 'login',
                'text-center md:text-left text-lg md:pl-8 mx-5':
                  pageType === 'top',
                hidden: pageType === 'lower',
              })}
            >
              {siteDescription}
            </h4>
            <nav
              className={cn({
                hidden: pageType === 'login',
              })}
            >
              <button
                className="bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded disabled:bg-gray-400 disabled:border-gray-400"
                onClick={onClickLogout}
                disabled={isLogout}
              >
                Logout
              </button>
            </nav>
          </section>
          <main>{children}</main>
        </Container>
      </div>
      {pageType !== 'login' && <Footer />}
    </>
  )
}

export default Layout
