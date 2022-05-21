import Link from 'next/link'
import { CMS_NAME } from '../lib/constants'
import { pagesPath } from '../lib/$path'

type Props = {
  isLowerPage?: boolean
}

const SiteTitle = ({ isLowerPage }: Props) => {
  return !isLowerPage ? (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        {CMS_NAME}
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        A statically generated blog example using{' '}
        <a
          href="https://nextjs.org/"
          className="underline hover:text-success duration-200 transition-colors"
        >
          Next.js
        </a>{' '}
        and Markdown.
      </h4>
    </section>
  ) : (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
      <Link href={pagesPath.private.$url()}>
        <a className="hover:underline">{CMS_NAME}</a>
      </Link>
    </h2>
  )
}

export default SiteTitle
