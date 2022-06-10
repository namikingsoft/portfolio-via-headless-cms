import Link from 'next/link'
import { ReactNode, useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { useLogoutMutation } from '../schemas/bff/client'
import {
  siteName,
  siteDescription,
  portfolioGitHubUrl,
  myEmail,
} from '../lib/constants'
import { pagesPath } from '../lib/$path'
import Container from './container'
import Avatar from './avatar'

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
      <div
        className={cn('min-h-screen', {
          'flex flex-col justify-center ': pageType === 'login',
        })}
      >
        <Container>
          <section
            className={cn({
              'flex flex-col items-center': pageType === 'login',
              'flex flex-col md:flex-row items-center md:justify-between mt-16 mb-16 md:mb-12':
                pageType === 'top',
              'flex flex-row items-center my-6': pageType === 'lower',
            })}
          >
            <h1
              className={cn({
                'text-6xl md:text-8xl font-bold tracking-tighter leading-tight':
                  pageType === 'login',
                'text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 grow':
                  pageType === 'top',
                'text-2xl font-bold tracking-tight md:tracking-tighter leading-tight grow':
                  pageType === 'lower',
              })}
            >
              {pageType === 'lower' ? (
                <Link href={pagesPath.private.$url()}>
                  <a className="hover flex flex-row items-center">
                    <Avatar className="mr-2" email={myEmail} size={32} />
                    {siteName}
                  </a>
                </Link>
              ) : (
                <div className="flex flex-row items-center">
                  <Avatar className="mr-5" email={myEmail} size={100} />
                  {siteName}
                </div>
              )}
            </h1>
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
        </Container>
        <main>{children}</main>
      </div>
      {pageType !== 'login' && (
        <footer className="bg-accent-1 border-t border-accent-2">
          <Container className="py-28 flex flex-col lg:flex-row items-center">
            <div className="grow">
              <h3 className="inline text-6xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
                {siteName}
              </h3>
              <cite className="text-xs block">
                Copyright ©️ {new Date().getFullYear()} Tsubasa Namiki, Based by{' '}
                <a
                  className="underline"
                  href="https://github.com/vercel/next.js/tree/canary/examples/blog-starter-typescript"
                >
                  blog-starter-typescript
                </a>{' '}
                using{' '}
                <a className="underline" href="https://nextjs.org/">
                  Next.js
                </a>
              </cite>
            </div>
            <a
              href={portfolioGitHubUrl}
              className="grow-0 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors"
            >
              View on GitHub
            </a>
          </Container>
        </footer>
      )}
    </>
  )
}

export default Layout
