import Container from './container'
import { siteName, portfolioGitHubUrl } from '../lib/constants'

const Footer = () => {
  return (
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
  )
}

export default Footer
