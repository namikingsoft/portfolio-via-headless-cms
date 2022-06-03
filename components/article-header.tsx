import Link from 'next/link'
import CoverImage from './cover-image'
import DateFormatter from './date-formatter'
import { Article } from '../contentful/types'
import { pagesPath } from '../lib/$path'

type Props = {
  article: Article
}

const ArticleHeader = ({ article }: Props) => {
  return (
    <>
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
        {article.title}
      </h1>
      <div className="hidden md:block md:mb-12">
        {article.tags.map((tag) => (
          <Link
            key={tag.slug}
            href={pagesPath.private.tags._slug(tag.slug).$url()}
          >
            <a className="hover last:mr-0 mr-1">
              <span className="text-xs font-semibold inline-block py-1 px-2 rounded text-pink-600 bg-pink-200 uppercase">
                {tag.title}
              </span>
            </a>
          </Link>
        ))}
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage src={article.image.url} alt={article.image.alt} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 text-lg">
          <DateFormatter dateString={article.publishedAt} />
        </div>
      </div>
    </>
  )
}

export default ArticleHeader
