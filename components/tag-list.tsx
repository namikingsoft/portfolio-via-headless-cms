import Link from 'next/link'
import cn from 'classnames'
import { Article } from '../schemas/contentful/types'
import { pagesPath } from '../lib/$path'

type Props = {
  article: Article
}

const baseClassName = 'font-semibold inline-block mt-2 py-1 px-2 rounded'

const TagList = ({ article }: Props) => {
  return (
    <div className="-mt-2">
      <Link
        key={article.category.slug}
        className="hover last:mr-0 mr-3"
        href={pagesPath.private.tags._slug(article.category.slug).$url()}
      >
        <span
          className={cn(
            baseClassName,
            'text-green-800 bg-green-200 hover:bg-green-300 transition-colors',
          )}
        >
          {article.category.title}
        </span>
      </Link>
      {article.tags.map((tag) => (
        <Link
          className="hover last:mr-0 mr-2"
          key={tag.slug}
          href={pagesPath.private.tags._slug(tag.slug).$url()}
        >
          <span
            className={cn(
              baseClassName,
              'text-slate-600 bg-slate-200 hover:bg-slate-300 transition-colors',
            )}
          >
            {tag.title}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default TagList
