import Link from 'next/link'
import { siteName } from '../lib/constants'
import { pagesPath } from '../lib/$path'

const Header = () => {
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
      <Link href={pagesPath.private.$url()}>
        <a className="hover:underline">{siteName}</a>
      </Link>
    </h2>
  )
}

export default Header
