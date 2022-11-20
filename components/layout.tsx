import Link from 'next/link'
import { ReactNode, useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaGithub } from 'react-icons/fa'
import cn from 'classnames'
import { useLogoutMutation } from '../schemas/bff/client'
import { siteName, siteDescription, portfolioGitHubUrl } from '../lib/constants'
import { pagesPath } from '../lib/$path'
import Container from './container'
import Block from './block'
import MyAvatar from './my-avatar'
import GtagVisitor from './gtag-visitor'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  const router = useRouter()

  const { t } = useTranslation()

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
      if (await logout({})) {
        router.push(pagesPath.$url().pathname)
      }
    } finally {
      setIsLogout(false)
    }
  }, [])

  return (
    <>
      <div
        className={cn('min-h-screen antialiased', {
          'flex flex-col justify-center': pageType === 'login',
        })}
      >
        <div
          className={cn({
            'absolute z-10 w-full drop-shadow-lg': pageType === 'top',
            'md:sticky lg:top-0': pageType === 'lower',
          })}
        >
          <Container>
            <section
              className={cn({
                'flex flex-col items-center': pageType === 'login',
                'flex flex-col gap-5 md:flex-row items-center justify-between pt-20':
                  pageType === 'top',
                'flex flex-row items-center py-6 justify-between':
                  pageType === 'lower',
              })}
            >
              <h1
                className={cn({
                  'text-6xl md:text-7xl font-bold tracking-tighter leading-tight':
                    pageType === 'login',
                  'text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-tight md:pr-8':
                    pageType === 'top',
                  'text-2xl font-bold tracking-tight md:tracking-tighter leading-tight rounded-lg backdrop-blur-sm p-0.5':
                    pageType === 'lower',
                })}
              >
                {pageType === 'lower' ? (
                  <Link
                    className="hover flex flex-row items-center gap-2"
                    href={pagesPath.private.$url()}
                  >
                    <MyAvatar size={32} />
                    {siteName}
                  </Link>
                ) : (
                  <div className="flex flex-row items-center gap-5">
                    <MyAvatar size={100} />
                    {siteName}
                  </div>
                )}
              </h1>
              <h2
                className={cn({
                  'text-lg mt-5': pageType === 'login',
                  'text-center md:text-left text-lg md:pl-8 mx-5':
                    pageType === 'top',
                  hidden: pageType === 'lower',
                })}
              >
                {siteDescription}
              </h2>
              <nav
                className={cn({
                  hidden: pageType === 'login',
                })}
              >
                <button
                  className={cn(
                    'text-sm rounded disabled:bg-gray-300 disabled:border-gray-300',
                    {
                      'bg-teal-700 hover:bg-teal-900 text-white py-2 px-3':
                        pageType === 'top',
                      'border border-gray-500 bg-white text-gray-500 hover:border-gray-200 hover:bg-gray-200 py-1 px-2':
                        pageType === 'lower',
                    },
                  )}
                  onClick={onClickLogout}
                  disabled={isLogout}
                >
                  {t('logout')}
                </button>
              </nav>
            </section>
          </Container>
        </div>
        <main>
          {pageType === 'login' ? (
            children
          ) : (
            <GtagVisitor>
              <Block>{children}</Block>
            </GtagVisitor>
          )}
        </main>
      </div>
      {pageType !== 'login' && (
        <footer className="bg-stone-100 border-t border-stone-200">
          <Container>
            <div className="py-28 flex flex-col gap-5 md:flex-row items-center">
              <div className="grow text-center md:text-left">
                <Link
                  href={pagesPath.private.$url()}
                  className="inline-flex items-center gap-3 text-6xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-3 lg:mb-0 lg:pr-4 lg:w-1/2"
                >
                  <MyAvatar size={48} /> {siteName}
                </Link>
                <cite className="text-xs block">
                  Copyright ©️ Tsubasa Namiki, Based by{' '}
                  <a
                    className="underline"
                    href="https://github.com/vercel/next.js/tree/canary/examples/blog-starter"
                  >
                    blog-starter
                  </a>{' '}
                  using{' '}
                  <a className="underline" href="https://nextjs.org/">
                    Next.js
                  </a>
                </cite>
              </div>
              <Link
                href={pagesPath.private.articles.$url()}
                className="bg-white hover:bg-black hover:text-white border border-black text-black font-bold py-3 px-12 lg:px-8 duration-200 transition-colors"
              >
                {t('allArticles')}
              </Link>
              <a
                href={portfolioGitHubUrl}
                className="inline-flex items-center gap-2 grow-0 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors"
              >
                <FaGithub size={20} />
                {t('viewOnGitHub')}
              </a>
            </div>
          </Container>
        </footer>
      )}
    </>
  )
}

export default Layout
