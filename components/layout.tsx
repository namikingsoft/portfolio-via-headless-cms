import { ReactNode, useMemo } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
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
              'text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8':
                pageType === 'lower',
            })}
          >
            <div
              className={cn({
                'text-6xl md:text-8xl font-bold tracking-tighter leading-tight':
                  pageType === 'login',
                'text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8':
                  pageType === 'top',
              })}
            >
              <h1>{siteName}</h1>
            </div>
            <h4
              className={cn({
                'text-lg mt-5': pageType === 'login',
                'text-center md:text-left text-lg mt-5 md:pl-8':
                  pageType === 'top',
                hidden: pageType === 'lower',
              })}
            >
              {siteDescription}
            </h4>
          </section>
          <main>{children}</main>
        </Container>
      </div>
      {pageType !== 'login' && <Footer />}
    </>
  )
}

export default Layout
